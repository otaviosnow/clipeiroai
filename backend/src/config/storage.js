// 💾 STORAGE CONFIGURATION - Local & S3
const fs = require('fs').promises;
const path = require('path');

const USE_S3 = process.env.USE_S3 === 'true';
const STORAGE_PATH = path.join(__dirname, '../../uploads');

// Garantir que diretórios existem
const ensureDirectories = async () => {
  const dirs = [
    path.join(STORAGE_PATH, 'originals'),
    path.join(STORAGE_PATH, 'clips'),
    path.join(STORAGE_PATH, 'backgrounds')
  ];

  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
  }
};

ensureDirectories();

// 📤 Upload Local
const uploadLocal = async (file, folder = 'videos') => {
  try {
    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(STORAGE_PATH, folder, filename);

    // Salvar arquivo
    await fs.writeFile(filepath, file.buffer);

    return {
      url: `/uploads/${folder}/${filename}`,
      key: `${folder}/${filename}`,
      path: filepath
    };
  } catch (error) {
    console.error('❌ Erro upload local:', error);
    throw error;
  }
};

// 🗑️ Deletar Local
const deleteLocal = async (key) => {
  try {
    const filepath = path.join(STORAGE_PATH, key);
    await fs.unlink(filepath);
    console.log('✅ Arquivo deletado:', key);
  } catch (error) {
    console.error('❌ Erro ao deletar:', error);
    throw error;
  }
};

// 📥 Get URL Local
const getLocalUrl = (key) => {
  return `/uploads/${key}`;
};

// 🎯 Upload Universal (S3 ou Local)
const uploadFile = async (file, folder = 'videos') => {
  if (USE_S3) {
    const { uploadToS3 } = require('./aws');
    return await uploadToS3(file, folder);
  } else {
    return await uploadLocal(file, folder);
  }
};

// 🗑️ Delete Universal
const deleteFile = async (key) => {
  if (USE_S3) {
    const { deleteFromS3 } = require('./aws');
    return await deleteFromS3(key);
  } else {
    return await deleteLocal(key);
  }
};

// 📥 Get URL Universal
const getFileUrl = (key) => {
  if (USE_S3) {
    const { getSignedUrl } = require('./aws');
    return getSignedUrl(key);
  } else {
    return getLocalUrl(key);
  }
};

module.exports = {
  uploadFile,
  deleteFile,
  getFileUrl,
  STORAGE_PATH,
  USE_S3
};
