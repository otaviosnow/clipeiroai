// 🔐 2FA HANDLER - hitools.pro automation
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Gera código 2FA usando o secret
 * Acessa https://hitools.pro para converter
 * @param {string} secret - 2FA secret do perfil
 * @returns {string} - Código 2FA de 6 dígitos
 */
async function get2FACode(secret) {
  try {
    console.log('🔐 Gerando código 2FA...');

    // Acessa hitools.pro
    const response = await axios.get('https://hitools.pro', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // Envia o secret para gerar código
    const codeResponse = await axios.post('https://hitools.pro/api/generate-2fa', {
      secret: secret
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (codeResponse.data && codeResponse.data.code) {
      const code = codeResponse.data.code;
      console.log(`✅ Código 2FA gerado: ${code}`);
      return code;
    }

    // Fallback: Usar algoritmo TOTP manual se API não funcionar
    const totpCode = generateTOTP(secret);
    console.log(`✅ Código 2FA (TOTP): ${totpCode}`);
    return totpCode;

  } catch (error) {
    console.error('❌ Erro ao gerar código 2FA:', error.message);
    
    // Fallback: Usar algoritmo TOTP
    const totpCode = generateTOTP(secret);
    console.log(`✅ Código 2FA (TOTP fallback): ${totpCode}`);
    return totpCode;
  }
}

/**
 * Gera código TOTP manualmente (Time-based One-Time Password)
 * Baseado no algoritmo RFC 6238
 * @param {string} secret - Base32 secret
 * @returns {string} - Código de 6 dígitos
 */
function generateTOTP(secret) {
  const crypto = require('crypto');
  
  // Decodificar base32
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  
  for (let i = 0; i < secret.length; i++) {
    const val = base32Chars.indexOf(secret.charAt(i).toUpperCase());
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }
  
  const key = Buffer.from(bytes);
  
  // Timestamp atual (30 segundos)
  const epoch = Math.floor(Date.now() / 1000);
  const time = Math.floor(epoch / 30);
  
  // Criar buffer de 8 bytes para o time
  const timeBuffer = Buffer.alloc(8);
  timeBuffer.writeUInt32BE(Math.floor(time / 0x100000000), 0);
  timeBuffer.writeUInt32BE(time & 0xffffffff, 4);
  
  // HMAC-SHA1
  const hmac = crypto.createHmac('sha1', key);
  hmac.update(timeBuffer);
  const hash = hmac.digest();
  
  // Extrair 4 bytes dinâmicos
  const offset = hash[hash.length - 1] & 0xf;
  const code = (
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff)
  ) % 1000000;
  
  return code.toString().padStart(6, '0');
}

/**
 * Validar se código 2FA é válido
 * @param {string} code - Código de 6 dígitos
 * @returns {boolean}
 */
function validate2FACode(code) {
  return /^\d{6}$/.test(code);
}

module.exports = {
  get2FACode,
  generateTOTP,
  validate2FACode
};
