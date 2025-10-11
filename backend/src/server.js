// 🚀 CLIPEIRO - BACKEND SERVER
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
const clipsRoutes = require('./routes/clips.routes');
const postsRoutes = require('./routes/posts.routes');
const adminRoutes = require('./routes/admin.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// 🔒 Security & Performance
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// 🚦 Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requests
});
app.use('/api/', limiter);

// 📊 Logging
app.use(morgan('combined'));

// 📦 Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 🌐 Rotas
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/clips', clipsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// 🏥 Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ❌ Error Handler
app.use(errorHandler);

// 🚀 Start Server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════╗
║                  🚀 CLIPEIRO API                      ║
║═══════════════════════════════════════════════════════║
║  🌐 Server running on port ${PORT}                      ║
║  📊 Environment: ${process.env.NODE_ENV || 'development'}              ║
║  🗄️  Database: Connected                              ║
║  ⏰ Started: ${new Date().toLocaleString()}            ║
╚═══════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
