// 🤖 WORKERS ENTRY POINT
require('dotenv').config();
const clipWorker = require('./queue/clip.worker');
const postWorker = require('./queue/post.worker');
const { cleanTempFiles } = require('./utils/helpers');

console.log(`
╔═══════════════════════════════════════════════════════╗
║              🤖 CLIPEIRO WORKERS                      ║
║═══════════════════════════════════════════════════════║
║  🎬 Clip Worker: ATIVO                                ║
║  📤 Post Worker: ATIVO                                ║
║  ⏰ Iniciado: ${new Date().toLocaleString()}          ║
╚═══════════════════════════════════════════════════════╝
`);

// Limpar arquivos temporários a cada hora
setInterval(async () => {
  console.log('🧹 Limpando arquivos temporários...');
  await cleanTempFiles();
}, 3600000); // 1 hora

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('⏸️ Encerrando workers...');
  await clipWorker.close();
  await postWorker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('⏸️ Encerrando workers...');
  await clipWorker.close();
  await postWorker.close();
  process.exit(0);
});
