// 🗄️ MONGODB CONNECTION
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://clipeiroai:otaviosnow2012@cluster0.0afjdgs.mongodb.net/clipeiro?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ MongoDB conectado com sucesso!');
    
    // Eventos de conexão
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB erro:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB desconectado');
    });

  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
