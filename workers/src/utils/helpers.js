// 🛠️ HELPERS
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

/**
 * Baixar arquivo de URL
 */
async function downloadFile(url, filename) {
  const filePath = path.join(__dirname, '../../temp', filename);
  
  // Garantir que diretório existe
  await fs.mkdir(path.join(__dirname, '../../temp'), { recursive: true });

  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  });

  const writer = require('fs').createWriteStream(filePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(filePath));
    writer.on('error', reject);
  });
}

/**
 * Limpar arquivos temporários
 */
async function cleanTempFiles() {
  const tempDir = path.join(__dirname, '../../temp');
  
  try {
    const files = await fs.readdir(tempDir);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const stats = await fs.stat(filePath);
      
      // Deletar arquivos com mais de 1 hora
      if (now - stats.mtimeMs > 3600000) {
        await fs.unlink(filePath);
        console.log(`🗑️ Arquivo temporário deletado: ${file}`);
      }
    }
  } catch (error) {
    console.error('Erro ao limpar temp:', error);
  }
}

module.exports = {
  downloadFile,
  cleanTempFiles
};
