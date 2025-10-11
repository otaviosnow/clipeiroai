// 📱 PROFILE MODEL (Perfis de corte TikTok)
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.CRYPTO_SECRET || 'clipeiro-secret-key-2024';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['tiktok', 'instagram', 'youtube'],
    default: 'tiktok'
  },
  username: {
    type: String,
    required: [true, 'Username é obrigatório'],
    trim: true
  },
  passwordEncrypted: {
    type: String,
    required: [true, 'Senha é obrigatória']
  },
  twoFactorSecret: {
    type: String, // Secret do 2FA para gerar códigos
    default: null
  },
  proxy: {
    type: String,
    default: null // formato: http://user:pass@host:port
  },
  sessionData: {
    type: mongoose.Schema.Types.Mixed, // Cookies, tokens, etc
    default: {}
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned', 'error'],
    default: 'active'
  },
  lastUsed: {
    type: Date,
    default: null
  },
  postsCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Criptografar senha antes de salvar
profileSchema.pre('save', function(next) {
  if (this.isModified('passwordEncrypted')) {
    this.passwordEncrypted = CryptoJS.AES.encrypt(
      this.passwordEncrypted, 
      SECRET_KEY
    ).toString();
  }
  next();
});

// Método para descriptografar senha
profileSchema.methods.decryptPassword = function() {
  const bytes = CryptoJS.AES.decrypt(this.passwordEncrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = mongoose.model('Profile', profileSchema);
