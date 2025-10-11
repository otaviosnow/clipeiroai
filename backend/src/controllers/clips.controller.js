// ✂️ CLIPS CONTROLLER
const Media = require('../models/Media');
const Log = require('../models/Log');
const { addClipJob } = require('../config/redis');
const { generateClips, uploadClips } = require('../services/ffmpeg.service');

// @desc    Gerar clipes de um vídeo
// @route   POST /api/clips/generate
// @access  Private
exports.generateClips = async (req, res) => {
  try {
    const { videoId, overlayText, useFixedBackground, fixedBackgroundId } = req.body;

    // Buscar vídeo original
    const originalVideo = await Media.findOne({
      _id: videoId,
      userId: req.user._id,
      type: 'original'
    });

    if (!originalVideo) {
      return res.status(404).json({
        success: false,
        message: 'Vídeo original não encontrado'
      });
    }

    // Buscar vídeos de background
    let backgroundVideos;
    if (useFixedBackground && fixedBackgroundId) {
      // Usar background fixo fornecido pelo usuário
      backgroundVideos = await Media.find({
        _id: fixedBackgroundId,
        userId: req.user._id
      });
    } else {
      // Usar backgrounds aleatórios do sistema
      backgroundVideos = await Media.aggregate([
        { $match: { type: 'background', isPublic: true } },
        { $sample: { size: 10 } }
      ]);
    }

    if (backgroundVideos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum vídeo de background disponível'
      });
    }

    // Adicionar job na fila
    const job = await addClipJob({
      userId: req.user._id,
      originalVideoId: originalVideo._id,
      originalVideoUrl: originalVideo.s3Url,
      backgroundVideos: backgroundVideos.map(v => ({
        id: v._id,
        url: v.s3Url
      })),
      overlayText: overlayText || null
    });

    // Log
    await Log.create({
      userId: req.user._id,
      action: 'clips_generated',
      level: 'info',
      message: `Geração de clipes iniciada para: ${originalVideo.filename}`,
      metadata: {
        videoId: originalVideo._id,
        jobId: job.id
      }
    });

    res.json({
      success: true,
      message: 'Geração de clipes iniciada! Você receberá uma notificação quando estiver pronto.',
      jobId: job.id,
      estimatedTime: '5-10 minutos'
    });

  } catch (error) {
    console.error('Generate clips error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao iniciar geração de clipes',
      error: error.message
    });
  }
};

// @desc    Listar clipes de um vídeo
// @route   GET /api/clips/:videoId
// @access  Private
exports.getClipsByVideo = async (req, res) => {
  try {
    const clips = await Media.find({
      originalVideoId: req.params.videoId,
      userId: req.user._id,
      type: 'clip'
    }).sort({ clipNumber: 1 });

    const originalVideo = await Media.findById(req.params.videoId);

    res.json({
      success: true,
      originalVideo: {
        id: originalVideo._id,
        filename: originalVideo.filename,
        url: originalVideo.s3Url
      },
      clips: clips.map(clip => ({
        id: clip._id,
        filename: clip.filename,
        url: clip.s3Url,
        clipNumber: clip.clipNumber,
        size: clip.size,
        status: clip.status,
        createdAt: clip.createdAt
      })),
      total: clips.length
    });

  } catch (error) {
    console.error('Get clips error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar clipes'
    });
  }
};

// @desc    Baixar clipe
// @route   GET /api/clips/download/:id
// @access  Private
exports.downloadClip = async (req, res) => {
  try {
    const clip = await Media.findOne({
      _id: req.params.id,
      userId: req.user._id,
      type: 'clip'
    });

    if (!clip) {
      return res.status(404).json({
        success: false,
        message: 'Clipe não encontrado'
      });
    }

    // Retornar URL do S3
    res.json({
      success: true,
      downloadUrl: clip.s3Url,
      filename: clip.filename
    });

  } catch (error) {
    console.error('Download clip error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar link de download'
    });
  }
};

// @desc    Deletar clipe
// @route   DELETE /api/clips/:id
// @access  Private
exports.deleteClip = async (req, res) => {
  try {
    const clip = await Media.findOne({
      _id: req.params.id,
      userId: req.user._id,
      type: 'clip'
    });

    if (!clip) {
      return res.status(404).json({
        success: false,
        message: 'Clipe não encontrado'
      });
    }

    // TODO: Deletar do S3
    // await deleteFromS3(clip.s3Key);

    await clip.deleteOne();

    res.json({
      success: true,
      message: 'Clipe deletado com sucesso!'
    });

  } catch (error) {
    console.error('Delete clip error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar clipe'
    });
  }
};
