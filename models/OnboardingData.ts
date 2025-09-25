import mongoose from 'mongoose'

export interface SocialProfile {
  platform: 'instagram' | 'tiktok' | 'youtube'
  username: string
  originalUsername: string
  isActive: boolean
  createdAt: Date
}

export interface OnboardingDataDocument extends mongoose.Document {
  userId: string
  objective: string
  socialProfiles: SocialProfile[]
  productChoice: 'clipeiro-ai'
  status: 'pending' | 'processing' | 'completed'
  clipAccounts: Array<{
    platform: string
    username: string
    status: 'created' | 'pending' | 'failed'
    originalProfile: string
  }>
  createdAt: Date
  updatedAt: Date
}

const OnboardingDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  objective: {
    type: String,
    required: true
  },
  socialProfiles: [{
    platform: {
      type: String,
      enum: ['instagram', 'tiktok', 'youtube'],
      required: true
    },
    username: {
      type: String,
      required: true
    },
    originalUsername: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  productChoice: {
    type: String,
    enum: ['clipeiro-ai'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending'
  },
  clipAccounts: [{
    platform: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['created', 'pending', 'failed'],
      default: 'pending'
    },
    originalProfile: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

OnboardingDataSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const OnboardingData = mongoose.models.OnboardingData || mongoose.model<OnboardingDataDocument>('OnboardingData', OnboardingDataSchema)
