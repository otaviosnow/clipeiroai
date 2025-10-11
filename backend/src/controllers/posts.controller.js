// 📤 POSTS CONTROLLER
const Post = require('../models/Post');
const Media = require('../models/Media');
const Profile = require('../models/Profile');
const Log = require('../models/Log');
const { addPostJob } = require('../config/redis');

// @desc    Agendar postagem no TikTok
// @route   POST /api/posts/schedule
// @access  Private
exports.schedulePost = async (req, res) => {
  try {
    const { clipId, profileId, caption, hashtags } = req.body;

    // Verificar se clipe existe
    const clip = await Media.findOne({
      _id: clipId,
      userId: req.user._id,
      type: 'clip'
    });

    if (!clip) {
      return res.status(404).json({
        success: false,
        message: 'Clipe não encontrado'
      });
    }

    // Verificar se perfil existe
    const profile = await Profile.findOne({
      _id: profileId,
      userId: req.user._id
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    // Criar post
    const post = await Post.create({
      userId: req.user._id,
      profileId,
      clipId,
      caption: caption || '',
      hashtags: hashtags || [],
      status: 'queued',
      scheduledAt: new Date()
    });

    // Adicionar job na fila
    const job = await addPostJob({
      postId: post._id,
      userId: req.user._id,
      profileId,
      clipId,
      clipUrl: clip.s3Url,
      caption: caption || '',
      hashtags: hashtags || []
    });

    // Atualizar post com jobId
    post.jobId = job.id;
    await post.save();

    // Log
    await Log.create({
      userId: req.user._id,
      profileId,
      postId: post._id,
      action: 'post_queued',
      level: 'info',
      message: `Post agendado para @${profile.username}`,
      metadata: {
        clipId,
        jobId: job.id
      }
    });

    res.json({
      success: true,
      message: 'Post agendado com sucesso! Aguarde a publicação.',
      post: {
        id: post._id,
        status: post.status,
        scheduledAt: post.scheduledAt,
        jobId: job.id
      }
    });

  } catch (error) {
    console.error('Schedule post error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao agendar post',
      error: error.message
    });
  }
};

// @desc    Listar posts do usuário
// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = { userId: req.user._id };
    if (status) query.status = status;

    const posts = await Post.find(query)
      .populate('profileId', 'username platform')
      .populate('clipId', 'filename clipNumber')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      posts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar posts'
    });
  }
};

// @desc    Obter detalhes de um post
// @route   GET /api/posts/:id
// @access  Private
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user._id
    })
      .populate('profileId')
      .populate('clipId');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    res.json({
      success: true,
      post
    });

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar post'
    });
  }
};

// @desc    Cancelar post
// @route   DELETE /api/posts/:id
// @access  Private
exports.cancelPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    if (post.status !== 'queued' && post.status !== 'processing') {
      return res.status(400).json({
        success: false,
        message: 'Post não pode ser cancelado'
      });
    }

    // TODO: Remover job da fila BullMQ

    post.status = 'cancelled';
    await post.save();

    res.json({
      success: true,
      message: 'Post cancelado com sucesso!'
    });

  } catch (error) {
    console.error('Cancel post error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao cancelar post'
    });
  }
};
