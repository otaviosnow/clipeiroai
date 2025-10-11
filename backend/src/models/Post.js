// 📤 POST MODEL (Postagens no TikTok)
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
  clipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  hashtags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['queued', 'processing', 'published', 'failed', 'cancelled'],
    default: 'queued',
    index: true
  },
  scheduledAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date,
    default: null
  },
  tiktokUrl: {
    type: String,
    default: null
  },
  tiktokVideoId: {
    type: String,
    default: null
  },
  error: {
    message: String,
    code: String,
    details: mongoose.Schema.Types.Mixed
  },
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 3
  },
  jobId: {
    type: String, // BullMQ job ID
    default: null
  }
}, {
  timestamps: true
});

// Index para queries
postSchema.index({ userId: 1, status: 1 });
postSchema.index({ profileId: 1, status: 1 });
postSchema.index({ scheduledAt: 1 });

module.exports = mongoose.model('Post', postSchema);
