// 📈 ANALYTICS MODEL
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  bioClicks: {
    type: Number,
    default: 0
  },
  engagementRate: {
    type: Number,
    default: 0 // calculado: (likes + comments + shares) / views * 100
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index para queries
analyticsSchema.index({ userId: 1, createdAt: -1 });
analyticsSchema.index({ profileId: 1, createdAt: -1 });
analyticsSchema.index({ postId: 1 });

// Método para calcular engagement rate
analyticsSchema.methods.calculateEngagement = function() {
  if (this.views === 0) return 0;
  
  const totalEngagement = this.likes + this.comments + this.shares;
  this.engagementRate = (totalEngagement / this.views) * 100;
  return this.engagementRate;
};

module.exports = mongoose.model('Analytics', analyticsSchema);
