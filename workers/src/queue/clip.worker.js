// ✂️ CLIP WORKER - Processar fila de geração de clipes
const { Worker } = require('bullmq');
const { connection } = require('../../backend/src/config/redis');
const Media = require('../../backend/src/models/Media');
const User = require('../../backend/src/models/User');
const Log = require('../../backend/src/models/Log');
const { generateClips, uploadClips } = require('../../backend/src/services/ffmpeg.service');
const connectDB = require('../../backend/src/config/database');

// Conectar ao banco
connectDB();

// Worker para processar geração de clipes
const clipWorker = new Worker('clip-generation', async (job) => {
  const { userId, originalVideoId, originalVideoUrl, backgroundVideos, overlayText } = job.data;

  console.log(`
╔════════════════════════════════════════════════════════╗
║           🎬 PROCESSANDO GERAÇÃO DE CLIPES            ║
╠════════════════════════════════════════════════════════╣
║  Job ID: ${job.id}                                     
║  User ID: ${userId}                                    
║  Video ID: ${originalVideoId}                          
╚════════════════════════════════════════════════════════╝
  `);

  try {
    // Atualizar progresso
    await job.updateProgress(10);

    // Buscar vídeo original do banco
    const originalVideo = await Media.findById(originalVideoId);
    if (!originalVideo) {
      throw new Error('Vídeo original não encontrado');
    }

    await job.updateProgress(20);

    // Preparar backgrounds
    const backgrounds = await Media.find({
      _id: { $in: backgroundVideos.map(v => v.id) }
    });

    if (backgrounds.length === 0) {
      throw new Error('Nenhum background encontrado');
    }

    console.log(`📹 Gerando 10 clipes...`);
    await job.updateProgress(30);

    // Gerar clipes com FFmpeg
    const clipFiles = await generateClips(originalVideo, backgrounds, overlayText);
    
    await job.updateProgress(60);

    console.log(`☁️ Enviando clipes para S3...`);

    // Upload para S3 e criar registros
    const clipData = await uploadClips(clipFiles, userId, originalVideoId);
    
    await job.updateProgress(80);

    // Salvar clipes no banco
    const savedClips = await Media.insertMany(clipData);

    await job.updateProgress(90);

    // Log
    await Log.create({
      userId,
      action: 'clips_generated',
      level: 'success',
      message: `${savedClips.length} clipes gerados com sucesso`,
      metadata: {
        originalVideoId,
        clipsGenerated: savedClips.length,
        jobId: job.id
      }
    });

    await job.updateProgress(100);

    console.log(`✅ Processamento completo! ${savedClips.length} clipes gerados.`);

    return {
      success: true,
      clipsGenerated: savedClips.length,
      clips: savedClips.map(c => ({
        id: c._id,
        url: c.s3Url,
        clipNumber: c.clipNumber
      }))
    };

  } catch (error) {
    console.error('❌ Erro ao processar clipes:', error);

    // Log de erro
    await Log.create({
      userId,
      action: 'clips_generated',
      level: 'error',
      message: `Erro ao gerar clipes: ${error.message}`,
      metadata: {
        originalVideoId,
        error: error.message,
        jobId: job.id
      }
    });

    throw error;
  }
}, {
  connection,
  concurrency: 2, // Processar 2 jobs por vez
  limiter: {
    max: 5, // Máximo 5 jobs
    duration: 60000 // Por minuto
  }
});

// Eventos do worker
clipWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completado!`);
});

clipWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} falhou:`, err.message);
});

clipWorker.on('error', (err) => {
  console.error('❌ Worker error:', err);
});

console.log('🎬 Clip Worker iniciado e aguardando jobs...');

module.exports = clipWorker;
