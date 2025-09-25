import mongoose, { Document, Schema } from 'mongoose'

export interface IBackgroundVideo extends Document {
  userId: mongoose.Types.ObjectId
  filename: string
  originalName: string
  path: string
  duration: number
  size: number
  format: string
  category: string
  tags: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const BackgroundVideoSchema = new Schema<IBackgroundVideo>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'geral',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
})

// Índices
BackgroundVideoSchema.index({ userId: 1 })
BackgroundVideoSchema.index({ category: 1 })
BackgroundVideoSchema.index({ isActive: 1 })
BackgroundVideoSchema.index({ tags: 1 })

export default mongoose.models.BackgroundVideo || mongoose.model<IBackgroundVideo>('BackgroundVideo', BackgroundVideoSchema)

