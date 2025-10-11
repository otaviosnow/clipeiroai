// 🤖 HUMAN SIMULATOR - Simula comportamento humano

/**
 * Delay aleatório entre min e max milissegundos
 */
async function randomDelay(min = 1000, max = 3000) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`⏳ Aguardando ${delay}ms...`);
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Digitar texto como humano (letra por letra com delay)
 */
async function humanType(page, selector, text, delayRange = [50, 150]) {
  await page.click(selector);
  await randomDelay(300, 600);
  
  for (const char of text) {
    await page.keyboard.type(char);
    await randomDelay(delayRange[0], delayRange[1]);
  }
  
  await randomDelay(200, 500);
}

/**
 * Mover mouse de forma natural (curva bezier)
 */
async function humanMouseMove(page, x, y) {
  // Simular movimento curvo do mouse
  const steps = Math.floor(Math.random() * 10) + 10;
  
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const currentX = x * progress;
    const currentY = y * progress;
    
    await page.mouse.move(currentX, currentY);
    await randomDelay(10, 30);
  }
}

/**
 * Click com delay antes e depois
 */
async function humanClick(page, selector) {
  await randomDelay(300, 800);
  await page.click(selector);
  await randomDelay(500, 1200);
}

/**
 * Scroll da página de forma natural
 */
async function humanScroll(page, distance = 300) {
  const scrollSteps = Math.floor(distance / 50);
  
  for (let i = 0; i < scrollSteps; i++) {
    await page.mouse.wheel(0, 50);
    await randomDelay(50, 150);
  }
  
  await randomDelay(500, 1000);
}

/**
 * Simular leitura de conteúdo
 */
async function simulateReading(minTime = 2000, maxTime = 5000) {
  const readingTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  console.log(`📖 Simulando leitura por ${readingTime}ms...`);
  await randomDelay(readingTime, readingTime);
}

/**
 * Movimentos aleatórios do mouse (simular hesitação)
 */
async function randomMouseMovements(page, count = 3) {
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 500);
    const y = Math.floor(Math.random() * 500);
    await humanMouseMove(page, x, y);
    await randomDelay(200, 600);
  }
}

/**
 * Simular comportamento de novo usuário (exploração)
 */
async function simulateExploration(page) {
  console.log('🔍 Simulando exploração da página...');
  
  // Scroll aleatório
  await humanScroll(page, Math.floor(Math.random() * 300) + 100);
  
  // Movimentos do mouse
  await randomMouseMovements(page, 2);
  
  // Pausa para "ler"
  await simulateReading(1000, 3000);
}

/**
 * User-Agent aleatório realista
 */
function getRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
  ];
  
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

/**
 * Viewport aleatório realista
 */
function getRandomViewport() {
  const viewports = [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
    { width: 2560, height: 1440 }
  ];
  
  return viewports[Math.floor(Math.random() * viewports.length)];
}

module.exports = {
  randomDelay,
  humanType,
  humanMouseMove,
  humanClick,
  humanScroll,
  simulateReading,
  randomMouseMovements,
  simulateExploration,
  getRandomUserAgent,
  getRandomViewport
};
