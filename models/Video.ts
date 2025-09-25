import mongoose, { Document, Schema } from 'mongoose'

export interface IVideo extends Document {
  userId: mongoose.Types.ObjectId
  originalVideo: {
    filename: string
    path: string
    duration: number
    size: number
    format: string
  }
  generatedClips: Array<{
    id: string
    format: string
    filename: string
    path: string
    thumbnail: string
    duration: number
    status: 'processing' | 'completed' | 'failed'
    createdAt: Date
  }>
  status: 'uploading' | 'processing' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}

const VideoSchema = new Schema<IVideo>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalVideo: {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    duration: { type: Number, required: true },
    size: { type: Number, required: true },
    format: { type: String, required: true },
  },
  generatedClips: [{
    id: { type: String, required: true },
    format: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['processing', 'completed', 'failed'],
      default: 'processing'
    },
    createdAt: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['uploading', 'processing', 'completed', 'failed'],
    default: 'uploading'
  }
}, {
  timestamps: true,
})

// Índices
VideoSchema.index({ userId: 1 })
VideoSchema.index({ status: 1 })
VideoSchema.index({ createdAt: -1 })

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema)

