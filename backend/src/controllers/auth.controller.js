// 🔐 AUTH CONTROLLER
const User = require('../models/User');
const Log = require('../models/Log');
const { generateToken } = require('../middlewares/auth');

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password
    });

    // Se for o primeiro usuário (admin default)
    if (email === 'tavinmktdigital@gmail.com') {
      user.role = 'admin';
      await user.save();
    }

    // Log
    await Log.create({
      userId: user._id,
      action: 'user_register',
      level: 'success',
      message: `Usuário registrado: ${email}`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    // Gerar token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao registrar usuário'
    });
  }
};

// @desc    Login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário com senha
    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Log
    await Log.create({
      userId: user._id,
      action: 'user_login',
      level: 'success',
      message: `Login realizado: ${email}`,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    // Gerar token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storageUsed: user.storageUsed,
        storageLimit: user.storageLimit
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login'
    });
  }
};

// @desc    Get user info
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storageUsed: user.storageUsed,
        storageLimit: user.storageLimit,
        storagePercentage: (user.storageUsed / user.storageLimit) * 100
      }
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar informações do usuário'
    });
  }
};
