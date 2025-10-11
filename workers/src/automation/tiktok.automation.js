// 🎵 TIKTOK AUTOMATION - Playwright
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs').promises;
const { get2FACode } = require('../utils/2fa.handler');
const {
  randomDelay,
  humanType,
  humanClick,
  humanScroll,
  simulateExploration,
  getRandomUserAgent,
  getRandomViewport
} = require('./human.simulator');

/**
 * Publicar vídeo no TikTok
 * @param {Object} profile - Profile do banco (com senha descriptografada)
 * @param {string} videoPath - Caminho do vídeo para upload
 * @param {string} caption - Legenda do vídeo
 * @param {Array} hashtags - Array de hashtags
 * @returns {Object} - Resultado da postagem
 */
async function publishToTikTok(profile, videoPath, caption = '', hashtags = []) {
  let browser;
  let context;
  let page;

  try {
    console.log('🚀 Iniciando automação TikTok...');
    console.log(`👤 Perfil: @${profile.username}`);

    // Configurar navegador
    const userAgent = getRandomUserAgent();
    const viewport = getRandomViewport();

    browser = await chromium.launch({
      headless: true, // Mudar para false para debug
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage'
      ]
    });

    // Criar contexto com configurações
    context = await browser.newContext({
      userAgent,
      viewport,
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo',
      permissions: ['geolocation'],
      geolocation: { latitude: -23.5505, longitude: -46.6333 } // São Paulo
    });

    // Carregar sessão anterior se existir
    if (profile.sessionData && profile.sessionData.cookies) {
      await context.addCookies(profile.sessionData.cookies);
      console.log('🍪 Cookies carregados');
    }

    page = await context.newPage();

    // Anti-detecção
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
      window.chrome = { runtime: {} };
    });

    // Acessar TikTok
    console.log('🌐 Acessando TikTok...');
    await page.goto('https://www.tiktok.com', { waitUntil: 'networkidle' });
    await randomDelay(2000, 4000);

    // Verificar se já está logado
    const isLoggedIn = await checkIfLoggedIn(page);

    if (!isLoggedIn) {
      console.log('🔐 Realizando login...');
      await performLogin(page, profile);
    } else {
      console.log('✅ Já está logado!');
    }

    // Navegar para página de upload
    console.log('📤 Navegando para upload...');
    await page.goto('https://www.tiktok.com/upload', { waitUntil: 'networkidle' });
    await randomDelay(2000, 3000);

    // Upload do vídeo
    console.log('📹 Fazendo upload do vídeo...');
    await uploadVideo(page, videoPath);

    // Preencher caption
    console.log('✍️ Preenchendo caption...');
    await fillCaption(page, caption, hashtags);

    // Publicar
    console.log('🚀 Publicando...');
    const postUrl = await publishPost(page);

    // Salvar cookies da sessão
    const cookies = await context.cookies();
    profile.sessionData = { cookies };

    console.log('✅ Vídeo publicado com sucesso!');
    console.log(`🔗 URL: ${postUrl}`);

    return {
      success: true,
      url: postUrl,
      sessionData: profile.sessionData
    };

  } catch (error) {
    console.error('❌ Erro na automação TikTok:', error);
    
    // Screenshot para debug
    if (page) {
      try {
        await page.screenshot({ path: `error-${Date.now()}.png` });
      } catch (e) {}
    }

    throw error;

  } finally {
    // Cleanup
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Verificar se já está logado
 */
async function checkIfLoggedIn(page) {
  try {
    await page.waitForSelector('[data-e2e="profile-icon"]', { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Realizar login no TikTok
 */
async function performLogin(page, profile) {
  try {
    // Clicar em "Log in"
    await humanClick(page, 'button:has-text("Log in"), a:has-text("Log in")');
    await randomDelay(1000, 2000);

    // Selecionar "Use phone / email / username"
    await humanClick(page, 'div:has-text("Use phone / email / username")');
    await randomDelay(1000, 2000);

    // Selecionar "Log in with email or username"
    await humanClick(page, 'a:has-text("Log in with email or username")');
    await randomDelay(1000, 2000);

    // Preencher username
    console.log('👤 Preenchendo username...');
    await humanType(page, 'input[name="username"]', profile.username);
    await randomDelay(500, 1000);

    // Preencher senha
    console.log('🔒 Preenchendo senha...');
    const password = profile.decryptPassword();
    await humanType(page, 'input[type="password"]', password);
    await randomDelay(1000, 2000);

    // Clicar em Log in
    await humanClick(page, 'button[type="submit"]');
    await randomDelay(3000, 5000);

    // Verificar se precisa 2FA
    const needs2FA = await check2FANeeded(page);

    if (needs2FA) {
      console.log('🔐 2FA detectado!');
      await handle2FA(page, profile);
    }

    // Aguardar login completar
    await page.waitForSelector('[data-e2e="profile-icon"]', { timeout: 10000 });
    console.log('✅ Login realizado com sucesso!');

  } catch (error) {
    console.error('❌ Erro no login:', error);
    throw new Error('Falha no login TikTok');
  }
}

/**
 * Verificar se precisa 2FA
 */
async function check2FANeeded(page) {
  try {
    await page.waitForSelector('input[placeholder*="code"], input[placeholder*="código"]', { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Lidar com 2FA
 */
async function handle2FA(page, profile) {
  if (!profile.twoFactorSecret) {
    throw new Error('2FA necessário mas secret não configurado');
  }

  // Gerar código 2FA
  const code = await get2FACode(profile.twoFactorSecret);
  console.log(`🔐 Código 2FA: ${code}`);

  // Preencher código
  await humanType(page, 'input[placeholder*="code"], input[placeholder*="código"]', code);
  await randomDelay(1000, 2000);

  // Submeter
  await humanClick(page, 'button[type="submit"]');
  await randomDelay(3000, 5000);
}

/**
 * Upload do vídeo
 */
async function uploadVideo(page, videoPath) {
  try {
    // Localizar input de file
    const fileInput = await page.locator('input[type="file"]').first();
    
    // Upload
    await fileInput.setInputFiles(videoPath);
    console.log('📹 Vídeo selecionado');

    // Aguardar upload processar
    await page.waitForSelector('[data-e2e="upload-success"], .upload-success', { timeout: 60000 });
    console.log('✅ Upload completado');

    await randomDelay(2000, 3000);

  } catch (error) {
    console.error('❌ Erro no upload:', error);
    throw new Error('Falha no upload do vídeo');
  }
}

/**
 * Preencher caption e hashtags
 */
async function fillCaption(page, caption, hashtags) {
  try {
    // Combinar caption com hashtags
    const fullCaption = `${caption}\n\n${hashtags.map(tag => `#${tag}`).join(' ')}`;

    // Preencher campo de caption
    const captionField = await page.locator('[contenteditable="true"], textarea[placeholder*="caption"]').first();
    await captionField.click();
    await randomDelay(500, 1000);

    // Digitar caption
    await humanType(page, '[contenteditable="true"], textarea[placeholder*="caption"]', fullCaption);
    
    console.log('✅ Caption preenchida');
    await randomDelay(1000, 2000);

  } catch (error) {
    console.error('⚠️ Erro ao preencher caption:', error);
    // Não falha se caption der erro
  }
}

/**
 * Publicar post
 */
async function publishPost(page) {
  try {
    // Clicar em Post
    await humanClick(page, 'button:has-text("Post"), button:has-text("Postar")');
    
    // Aguardar confirmação
    await page.waitForSelector('[data-e2e="upload-success-modal"], .upload-complete', { timeout: 30000 });
    console.log('✅ Post publicado!');

    await randomDelay(2000, 3000);

    // Tentar extrair URL do post
    try {
      const urlElement = await page.locator('a[href*="tiktok.com/@"]').first();
      const url = await urlElement.getAttribute('href');
      return url;
    } catch {
      return `https://www.tiktok.com/@${profile.username}`;
    }

  } catch (error) {
    console.error('❌ Erro ao publicar:', error);
    throw new Error('Falha ao publicar post');
  }
}

module.exports = {
  publishToTikTok
};
