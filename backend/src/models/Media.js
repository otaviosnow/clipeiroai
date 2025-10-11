// 🎬 MEDIA MODEL (Vídeos e Clipes)
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['original', 'clip', 'background'],
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  s3Key: {
    type: String,
    required: true
  },
  s3Url: {
    type: String,
    required: true
  },
  size: {
    type: Number, // em bytes
    required: true
  },
  duration: {
    type: Number, // em segundos
    default: null
  },
  resolution: {
    width: Number,
    height: Number
  },
  format: {
    type: String,
    default: 'mp4'
  },
  // Para clipes gerados
  originalVideoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    default: null
  },
  backgroundVideoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    default: null
  },
  overlayText: {
    type: String,
    default: null
  },
  clipNumber: {
    type: Number, // 1 a 10
    default: null
  },
  // Status
  status: {
    type: String,
    enum: ['processing', 'ready', 'failed', 'deleted'],
    default: 'processing'
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index para queries rápidas
mediaSchema.index({ userId: 1, type: 1, status: 1 });
mediaSchema.index({ originalVideoId: 1 });

module.exports = mongoose.model('Media', mediaSchema);
