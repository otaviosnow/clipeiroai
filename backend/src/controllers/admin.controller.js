// 👑 ADMIN CONTROLLER
const User = require('../models/User');
const Profile = require('../models/Profile');
const Media = require('../models/Media');
const Post = require('../models/Post');
const Log = require('../models/Log');

// @desc    Criar perfil de corte
// @route   POST /api/admin/profiles
// @access  Private (Admin)
exports.createProfile = async (req, res) => {
  try {
    const { userId, platform, username, password, twoFactorSecret, proxy } = req.body;

    const profile = await Profile.create({
      userId,
      platform,
      username,
      passwordEncrypted: password, // Será criptografado no pre-save
      twoFactorSecret: twoFactorSecret || null,
      proxy: proxy || null
    });

    await Log.create({
      userId: req.user._id,
      action: 'profile_created',
      level: 'success',
      message: `Perfil criado: @${username} (${platform})`,
      metadata: { profileId: profile._id }
    });

    res.status(201).json({
      success: true,
      message: 'Perfil criado com sucesso!',
      profile: {
        id: profile._id,
        username: profile.username,
        platform: profile.platform
      }
    });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar perfil'
    });
  }
};

// @desc    Listar todos os perfis
// @route   GET /api/admin/profiles
// @access  Private (Admin)
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      profiles,
      total: profiles.length
    });
  } catch (error) {
    console.error('Get profiles error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar perfis'
    });
  }
};

// @desc    Atualizar perfil
// @route   PUT /api/admin/profiles/:id
// @access  Private (Admin)
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    Object.assign(profile, req.body);
    await profile.save();

    res.json({
      success: true,
      message: 'Perfil atualizado!',
      profile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar perfil'
    });
  }
};

// @desc    Deletar perfil
// @route   DELETE /api/admin/profiles/:id
// @access  Private (Admin)
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    await profile.deleteOne();

    res.json({
      success: true,
      message: 'Perfil deletado!'
    });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar perfil'
    });
  }
};

// @desc    Dashboard admin - estatísticas
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      profiles: await Profile.countDocuments(),
      videos: await Media.countDocuments({ type: 'original' }),
      clips: await Media.countDocuments({ type: 'clip' }),
      backgrounds: await Media.countDocuments({ type: 'background' }),
      posts: {
        total: await Post.countDocuments(),
        queued: await Post.countDocuments({ status: 'queued' }),
        processing: await Post.countDocuments({ status: 'processing' }),
        published: await Post.countDocuments({ status: 'published' }),
        failed: await Post.countDocuments({ status: 'failed' })
      }
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas'
    });
  }
};

// @desc    Listar todos os logs
// @route   GET /api/admin/logs
// @access  Private (Admin)
exports.getLogs = async (req, res) => {
  try {
    const { level, action, page = 1, limit = 50 } = req.query;

    const query = {};
    if (level) query.level = level;
    if (action) query.action = action;

    const logs = await Log.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Log.countDocuments(query);

    res.json({
      success: true,
      logs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar logs'
    });
  }
};
