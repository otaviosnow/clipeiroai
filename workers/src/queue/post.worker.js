// 📤 POST WORKER - Processar fila de postagens TikTok
const { Worker } = require('bullmq');
const { connection } = require('../../backend/src/config/redis');
const Post = require('../../backend/src/models/Post');
const Profile = require('../../backend/src/models/Profile');
const Media = require('../../backend/src/models/Media');
const Log = require('../../backend/src/models/Log');
const { publishToTikTok } = require('../automation/tiktok.automation');
const connectDB = require('../../backend/src/config/database');
const { downloadFile } = require('../utils/helpers');

// Conectar ao banco
connectDB();

// Worker para processar postagens
const postWorker = new Worker('tiktok-posts', async (job) => {
  const { postId, userId, profileId, clipId, clipUrl, caption, hashtags } = job.data;

  console.log(`
╔════════════════════════════════════════════════════════╗
║         🚀 PROCESSANDO POSTAGEM TIKTOK                ║
╠════════════════════════════════════════════════════════╣
║  Job ID: ${job.id}                                     
║  Post ID: ${postId}                                    
║  Profile ID: ${profileId}                              
╚════════════════════════════════════════════════════════╝
  `);

  try {
    // Atualizar status do post
    await Post.findByIdAndUpdate(postId, {
      status: 'processing'
    });

    await job.updateProgress(10);

    // Buscar perfil
    const profile = await Profile.findById(profileId);
    if (!profile) {
      throw new Error('Perfil não encontrado');
    }

    if (profile.status !== 'active') {
      throw new Error('Perfil não está ativo');
    }

    console.log(`👤 Perfil: @${profile.username}`);

    await job.updateProgress(20);

    // Buscar clipe
    const clip = await Media.findById(clipId);
    if (!clip) {
      throw new Error('Clipe não encontrado');
    }

    console.log(`📹 Clipe: ${clip.filename}`);

    await job.updateProgress(30);

    // Baixar vídeo do S3
    console.log('📥 Baixando vídeo do S3...');
    const videoPath = await downloadFile(clip.s3Url, `temp_${Date.now()}.mp4`);

    await job.updateProgress(50);

    // Publicar no TikTok
    console.log('🚀 Publicando no TikTok...');
    const result = await publishToTikTok(profile, videoPath, caption, hashtags);

    await job.updateProgress(80);

    // Atualizar post
    await Post.findByIdAndUpdate(postId, {
      status: 'published',
      publishedAt: new Date(),
      tiktokUrl: result.url
    });

    // Atualizar perfil
    profile.lastUsed = new Date();
    profile.postsCount += 1;
    if (result.sessionData) {
      profile.sessionData = result.sessionData;
    }
    await profile.save();

    // Log
    await Log.create({
      userId,
      profileId,
      postId,
      action: 'post_published',
      level: 'success',
      message: `Post publicado com sucesso em @${profile.username}`,
      metadata: {
        tiktokUrl: result.url,
        clipId,
        jobId: job.id
      }
    });

    await job.updateProgress(100);

    console.log(`✅ Post publicado com sucesso!`);
    console.log(`🔗 URL: ${result.url}`);

    // Limpar arquivo temporário
    try {
      const fs = require('fs').promises;
      await fs.unlink(videoPath);
    } catch (e) {}

    return {
      success: true,
      url: result.url,
      profile: profile.username
    };

  } catch (error) {
    console.error('❌ Erro ao processar post:', error);

    // Atualizar post como falho
    const post = await Post.findById(postId);
    post.status = 'failed';
    post.attempts += 1;
    post.error = {
      message: error.message,
      code: error.code || 'UNKNOWN',
      details: error.stack
    };
    await post.save();

    // Log de erro
    await Log.create({
      userId,
      profileId,
      postId,
      action: 'post_failed',
      level: 'error',
      message: `Erro ao publicar post: ${error.message}`,
      metadata: {
        error: error.message,
        attempts: post.attempts,
        jobId: job.id
      }
    });

    // Retry se não atingiu máximo de tentativas
    if (post.attempts < post.maxAttempts) {
      console.log(`🔄 Retry ${post.attempts}/${post.maxAttempts}...`);
      throw error; // BullMQ vai fazer retry automaticamente
    }

    throw new Error(`Post falhou após ${post.attempts} tentativas`);
  }
}, {
  connection,
  concurrency: 1, // Processar 1 por vez para evitar ban
  limiter: {
    max: 10, // Máximo 10 posts
    duration: 3600000 // Por hora (rate limiting)
  }
});

// Eventos do worker
postWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completado!`);
});

postWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} falhou:`, err.message);
});

postWorker.on('error', (err) => {
  console.error('❌ Worker error:', err);
});

console.log('📤 Post Worker iniciado e aguardando jobs...');

module.exports = postWorker;
