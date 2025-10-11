// 🎬 FFMPEG SERVICE
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs').promises;
const { uploadFile } = require('../config/storage');

// Diretório temporário para processamento
const TEMP_DIR = path.join(__dirname, '../../temp');

// Garantir que diretório temp existe
const ensureTempDir = async () => {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating temp dir:', error);
  }
};

// @desc    Gerar 10 clipes do vídeo original
// @param   originalVideo - Media object do vídeo original
// @param   backgroundVideos - Array de Media objects (backgrounds)
// @param   overlayText - Texto opcional para sobrepor
// @returns Array de clipes gerados
exports.generateClips = async (originalVideo, backgroundVideos, overlayText = null) => {
  await ensureTempDir();
  
  const clips = [];
  const tempFiles = [];

  try {
    console.log('🎬 Iniciando geração de 10 clipes...');

    for (let i = 0; i < 10; i++) {
      console.log(`📹 Gerando clipe ${i + 1}/10...`);

      // Selecionar background (aleatório ou fixo)
      const backgroundVideo = backgroundVideos[i % backgroundVideos.length];

      // Nome do arquivo temporário
      const outputFile = path.join(TEMP_DIR, `clip_${Date.now()}_${i}.mp4`);
      tempFiles.push(outputFile);

      // Gerar clipe com FFmpeg
      await new Promise((resolve, reject) => {
        const command = ffmpeg();

        // Input 1: Vídeo original (topo)
        command.input(originalVideo.s3Url);

        // Input 2: Vídeo background (fundo)
        command.input(backgroundVideo.s3Url);

        // Filter complex para combinar vídeos
        let filterComplex = [
          // Redimensionar vídeo original para metade superior (1080x960)
          '[0:v]scale=1080:960,setpts=PTS-STARTPTS[top]',
          // Redimensionar background para metade inferior (1080x960)
          '[1:v]scale=1080:960,setpts=PTS-STARTPTS[bottom]',
          // Empilhar verticalmente
          '[top][bottom]vstack=inputs=2[stacked]'
        ];

        // Adicionar texto se fornecido
        if (overlayText) {
          filterComplex.push(
            `[stacked]drawtext=text='${overlayText}':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=960:box=1:boxcolor=black@0.5:boxborderw=10[final]`
          );
        } else {
          filterComplex.push('[stacked]null[final]');
        }

        command
          .complexFilter(filterComplex.join(';'))
          .map('[final]')
          .outputOptions([
            '-c:v libx264',
            '-preset fast',
            '-crf 23',
            '-c:a aac',
            '-b:a 128k',
            '-t 60', // Máximo 60 segundos
            '-pix_fmt yuv420p'
          ])
          .output(outputFile)
          .on('end', () => {
            console.log(`✅ Clipe ${i + 1} gerado: ${outputFile}`);
            resolve();
          })
          .on('error', (err) => {
            console.error(`❌ Erro ao gerar clipe ${i + 1}:`, err);
            reject(err);
          })
          .run();
      });

      clips.push(outputFile);
    }

    console.log('🎉 Todos os 10 clipes gerados com sucesso!');
    return clips;

  } catch (error) {
    // Limpar arquivos temporários em caso de erro
    for (const file of tempFiles) {
      try {
        await fs.unlink(file);
      } catch (err) {
        console.error('Error deleting temp file:', err);
      }
    }
    throw error;
  }
};

// @desc    Upload clipes para S3 e criar registros
// @param   clipFiles - Array de caminhos dos clipes
// @param   userId - ID do usuário
// @param   originalVideoId - ID do vídeo original
// @returns Array de Media objects
exports.uploadClips = async (clipFiles, userId, originalVideoId) => {
  const uploadedClips = [];

  for (let i = 0; i < clipFiles.length; i++) {
    const clipPath = clipFiles[i];

    try {
      // Ler arquivo
      const fileBuffer = await fs.readFile(clipPath);
      const fileStats = await fs.stat(clipPath);

      // Criar objeto file para upload
      const file = {
        originalname: `clip_${i + 1}.mp4`,
        buffer: fileBuffer,
        mimetype: 'video/mp4',
        size: fileStats.size
      };

      // Upload para storage
      const uploadResult = await uploadFile(file, 'clips');

      uploadedClips.push({
        userId,
        type: 'clip',
        filename: file.originalname,
        s3Key: uploadResult.key,
        s3Url: uploadResult.url,
        size: file.size,
        format: 'mp4',
        originalVideoId,
        clipNumber: i + 1,
        status: 'ready'
      });

      // Deletar arquivo temporário
      await fs.unlink(clipPath);

    } catch (error) {
      console.error(`Error uploading clip ${i + 1}:`, error);
    }
  }

  return uploadedClips;
};

// @desc    Limpar arquivos temporários antigos
exports.cleanTempFiles = async () => {
  try {
    const files = await fs.readdir(TEMP_DIR);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = path.join(TEMP_DIR, file);
      const stats = await fs.stat(filePath);
      
      // Deletar arquivos com mais de 1 hora
      if (now - stats.mtimeMs > 3600000) {
        await fs.unlink(filePath);
        console.log(`🗑️ Temp file deleted: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning temp files:', error);
  }
};
