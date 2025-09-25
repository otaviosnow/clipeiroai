import mongoose, { Document, Schema } from 'mongoose'

export interface IScheduledPost extends Document {
  userId: mongoose.Types.ObjectId
  videoId: mongoose.Types.ObjectId
  clipId: string
  platform: 'tiktok' | 'instagram' | 'youtube'
  accountId: string
  accountName: string
  scheduledFor: Date
  status: 'scheduled' | 'posted' | 'failed' | 'cancelled'
  postData: {
    caption?: string
    hashtags?: string[]
    thumbnail?: string
  }
  errorMessage?: string
  postedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ScheduledPostSchema = new Schema<IScheduledPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  clipId: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['tiktok', 'instagram', 'youtube'],
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  scheduledFor: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'posted', 'failed', 'cancelled'],
    default: 'scheduled',
  },
  postData: {
    caption: String,
    hashtags: [String],
    thumbnail: String,
  },
  errorMessage: String,
  postedAt: Date,
}, {
  timestamps: true,
})

// Índices
ScheduledPostSchema.index({ userId: 1 })
ScheduledPostSchema.index({ scheduledFor: 1 })
ScheduledPostSchema.index({ status: 1 })
ScheduledPostSchema.index({ platform: 1 })

export default mongoose.models.ScheduledPost || mongoose.model<IScheduledPost>('ScheduledPost', ScheduledPostSchema)

