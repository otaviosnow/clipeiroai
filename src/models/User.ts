import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  avatar?: string
  isEmailVerified: boolean
  emailVerificationToken?: string
  passwordResetToken?: string
  passwordResetExpires?: Date
  socialAccounts: {
    tiktok: Array<{
      id: string
      username: string
      displayName: string
      accessToken: string
      refreshToken?: string
      isActive: boolean
    }>
    instagram: Array<{
      id: string
      username: string
      displayName: string
      accessToken: string
      refreshToken?: string
      isActive: boolean
    }>
    youtube: Array<{
      id: string
      username: string
      displayName: string
      accessToken: string
      refreshToken?: string
      isActive: boolean
    }>
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    default: null,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  passwordResetExpires: {
    type: Date,
    default: null,
  },
  socialAccounts: {
    tiktok: [{
      id: String,
      username: String,
      displayName: String,
      accessToken: String,
      refreshToken: String,
      isActive: { type: Boolean, default: true }
    }],
    instagram: [{
      id: String,
      username: String,
      displayName: String,
      accessToken: String,
      refreshToken: String,
      isActive: { type: Boolean, default: true }
    }],
    youtube: [{
      id: String,
      username: String,
      displayName: String,
      accessToken: String,
      refreshToken: String,
      isActive: { type: Boolean, default: true }
    }]
  }
}, {
  timestamps: true,
})

// Índices para melhor performance
UserSchema.index({ email: 1 })
UserSchema.index({ emailVerificationToken: 1 })
UserSchema.index({ passwordResetToken: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

