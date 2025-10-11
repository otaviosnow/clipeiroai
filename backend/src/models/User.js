// 👤 USER MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  storageUsed: {
    type: Number,
    default: 0 // em bytes
  },
  storageLimit: {
    type: Number,
    default: 6 * 1024 * 1024 * 1024 // 6GB em bytes
  }
}, {
  timestamps: true
});

// Hash password antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar senha
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Verificar se tem espaço disponível
userSchema.methods.hasStorageSpace = function(fileSize) {
  return (this.storageUsed + fileSize) <= this.storageLimit;
};

module.exports = mongoose.model('User', userSchema);
