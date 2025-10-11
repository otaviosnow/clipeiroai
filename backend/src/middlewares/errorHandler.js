// ❌ ERROR HANDLER MIDDLEWARE
const Log = require('../models/Log');

const errorHandler = async (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Log error no banco
  try {
    await Log.create({
      userId: req.user ? req.user._id : null,
      action: 'error',
      level: 'error',
      message: err.message,
      metadata: {
        stack: err.stack,
        path: req.path,
        method: req.method
      },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }

  // Resposta padrão
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
