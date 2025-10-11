// 📊 ANALYTICS CONTROLLER
const Analytics = require('../models/Analytics');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// @desc    Obter analytics do usuário
// @route   GET /api/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
  try {
    const { profileId, startDate, endDate } = req.query;

    const query = { userId: req.user._id };
    if (profileId) query.profileId = profileId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(query)
      .populate('profileId', 'username platform')
      .populate('postId', 'caption')
      .sort({ createdAt: -1 });

    // Calcular totais
    const totals = analytics.reduce((acc, curr) => ({
      views: acc.views + curr.views,
      likes: acc.likes + curr.likes,
      comments: acc.comments + curr.comments,
      shares: acc.shares + curr.shares,
      bioClicks: acc.bioClicks + curr.bioClicks
    }), { views: 0, likes: 0, comments: 0, shares: 0, bioClicks: 0 });

    const avgEngagement = analytics.length > 0
      ? analytics.reduce((sum, a) => sum + a.engagementRate, 0) / analytics.length
      : 0;

    res.json({
      success: true,
      analytics,
      totals,
      avgEngagement: avgEngagement.toFixed(2),
      count: analytics.length
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar analytics'
    });
  }
};

// @desc    Obter dashboard overview
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    // Posts por status
    const postStats = {
      total: await Post.countDocuments({ userId: req.user._id }),
      published: await Post.countDocuments({ userId: req.user._id, status: 'published' }),
      queued: await Post.countDocuments({ userId: req.user._id, status: 'queued' }),
      failed: await Post.countDocuments({ userId: req.user._id, status: 'failed' })
    };

    // Analytics totais
    const analytics = await Analytics.find({ userId: req.user._id });
    
    const totals = analytics.reduce((acc, curr) => ({
      views: acc.views + curr.views,
      likes: acc.likes + curr.likes,
      comments: acc.comments + curr.comments,
      shares: acc.shares + curr.shares,
      bioClicks: acc.bioClicks + curr.bioClicks
    }), { views: 0, likes: 0, comments: 0, shares: 0, bioClicks: 0 });

    // Perfis ativos
    const profiles = await Profile.find({ userId: req.user._id, isActive: true });

    // Top 5 posts
    const topPosts = await Analytics.find({ userId: req.user._id })
      .sort({ views: -1 })
      .limit(5)
      .populate('postId')
      .populate('profileId', 'username');

    res.json({
      success: true,
      dashboard: {
        postStats,
        totals,
        activeProfiles: profiles.length,
        topPosts
      }
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar dashboard'
    });
  }
};
