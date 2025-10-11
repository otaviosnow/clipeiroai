// 📊 LOG MODEL
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    default: null
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: null
  },
  action: {
    type: String,
    required: true,
    enum: [
      'user_login',
      'user_register',
      'video_upload',
      'clips_generated',
      'post_queued',
      'post_published',
      'post_failed',
      'profile_created',
      'profile_updated',
      'profile_deleted',
      'storage_limit_reached',
      'error'
    ]
  },
  level: {
    type: String,
    enum: ['info', 'warning', 'error', 'success'],
    default: 'info'
  },
  message: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index para queries
logSchema.index({ userId: 1, createdAt: -1 });
logSchema.index({ action: 1, createdAt: -1 });
logSchema.index({ level: 1, createdAt: -1 });

// TTL Index - deletar logs após 90 dias
logSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

module.exports = mongoose.model('Log', logSchema);
