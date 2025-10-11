// 📤 UPLOAD MIDDLEWARE
const multer = require('multer');

// Configuração de upload
const storage = multer.memoryStorage(); // Armazenar em memória para depois enviar para S3

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  // Aceitar apenas vídeos
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de vídeo são permitidos!'), false);
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024, // 2GB
  },
  fileFilter: fileFilter
});

// Middleware para upload único
exports.uploadSingle = upload.single('video');

// Middleware para múltiplos uploads
exports.uploadMultiple = upload.array('videos', 100); // Para background videos

// Error handler de upload
exports.handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Arquivo muito grande. Máximo 2GB por vídeo.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Erro no upload: ${error.message}`
    });
  }
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next();
};
