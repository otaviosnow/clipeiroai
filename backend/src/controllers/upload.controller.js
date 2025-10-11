// 📤 UPLOAD CONTROLLER
const User = require('../models/User');
const Media = require('../models/Media');
const Log = require('../models/Log');
const { uploadFile } = require('../config/storage');

// @desc    Upload vídeo original
// @route   POST /api/upload/video
// @access  Private
exports.uploadVideo = async (req, res) => {
  try {
    const userId = req.user._id;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo enviado'
      });
    }

    const fileSize = req.file.size;

    // Verificar limite de storage
    const user = await User.findById(userId);
    if (!user.hasStorageSpace(fileSize)) {
      return res.status(400).json({
        success: false,
        message: `Limite de storage atingido. Você tem ${((user.storageLimit - user.storageUsed) / 1024 / 1024 / 1024).toFixed(2)}GB disponíveis.`
      });
    }

    // Verificar limite de 2GB por arquivo
    if (fileSize > 2 * 1024 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Arquivo muito grande. Máximo 2GB por vídeo.'
      });
    }

    // Upload para storage
    console.log('📤 Uploading video...');
    const uploadResult = await uploadFile(req.file, 'originals');

    // Criar registro no banco
    const media = await Media.create({
      userId,
      type: 'original',
      filename: req.file.originalname,
      s3Key: uploadResult.key,
      s3Url: uploadResult.url,
      size: fileSize,
      format: req.file.mimetype.split('/')[1],
      status: 'ready'
    });

    // Atualizar storage usado
    user.storageUsed += fileSize;
    await user.save();

    // Log
    await Log.create({
      userId,
      action: 'video_upload',
      level: 'success',
      message: `Vídeo enviado: ${req.file.originalname} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`,
      metadata: {
        mediaId: media._id,
        filename: req.file.originalname,
        size: fileSize
      }
    });

    console.log('✅ Video uploaded successfully');

    res.json({
      success: true,
      message: 'Vídeo enviado com sucesso!',
      media: {
        id: media._id,
        filename: media.filename,
        size: media.size,
        url: media.s3Url,
        status: media.status
      },
      storage: {
        used: user.storageUsed,
        limit: user.storageLimit,
        percentage: (user.storageUsed / user.storageLimit) * 100
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar vídeo',
      error: error.message
    });
  }
};

// @desc    Upload vídeos background (Admin)
// @route   POST /api/upload/backgrounds
// @access  Private (Admin)
exports.uploadBackgrounds = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo enviado'
      });
    }

    const uploadedVideos = [];

    // Upload múltiplos vídeos
    for (const file of req.files) {
      const uploadResult = await uploadFile(file, 'backgrounds');

      const media = await Media.create({
        userId: req.user._id,
        type: 'background',
        filename: file.originalname,
        s3Key: uploadResult.key,
        s3Url: uploadResult.url,
        size: file.size,
        format: file.mimetype.split('/')[1],
        status: 'ready',
        isPublic: true
      });

      uploadedVideos.push({
        id: media._id,
        filename: media.filename,
        url: media.s3Url
      });
    }

    // Log
    await Log.create({
      userId: req.user._id,
      action: 'video_upload',
      level: 'success',
      message: `${uploadedVideos.length} vídeos background enviados`,
      metadata: {
        count: uploadedVideos.length
      }
    });

    res.json({
      success: true,
      message: `${uploadedVideos.length} vídeos enviados com sucesso!`,
      videos: uploadedVideos
    });
  } catch (error) {
    console.error('Upload backgrounds error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar vídeos',
      error: error.message
    });
  }
};

// @desc    Listar vídeos do usuário
// @route   GET /api/upload/my-videos
// @access  Private
exports.getMyVideos = async (req, res) => {
  try {
    const { type = 'original', page = 1, limit = 20 } = req.query;

    const query = {
      userId: req.user._id,
      type
    };

    const videos = await Media.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Media.countDocuments(query);

    res.json({
      success: true,
      videos,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar vídeos'
    });
  }
};

// @desc    Deletar vídeo
// @route   DELETE /api/upload/:id
// @access  Private
exports.deleteVideo = async (req, res) => {
  try {
    const media = await Media.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Vídeo não encontrado'
      });
    }

    // TODO: Deletar do S3
    // await deleteFromS3(media.s3Key);

    // Atualizar storage usado
    const user = await User.findById(req.user._id);
    user.storageUsed -= media.size;
    await user.save();

    // Deletar registro
    await media.deleteOne();

    // Log
    await Log.create({
      userId: req.user._id,
      action: 'video_upload',
      level: 'info',
      message: `Vídeo deletado: ${media.filename}`
    });

    res.json({
      success: true,
      message: 'Vídeo deletado com sucesso!'
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar vídeo'
    });
  }
};
