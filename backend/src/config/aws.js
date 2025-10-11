// ☁️ AWS S3 CONFIGURATION
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'clipeiro-videos';

// 📤 Upload para S3
const uploadToS3 = async (file, folder = 'videos') => {
  const key = `${folder}/${Date.now()}-${file.originalname}`;
  
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private'
  };

  try {
    const result = await s3.upload(params).promise();
    return {
      url: result.Location,
      key: result.Key,
      bucket: result.Bucket
    };
  } catch (error) {
    console.error('❌ Erro upload S3:', error);
    throw error;
  }
};

// 🗑️ Deletar do S3
const deleteFromS3 = async (key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key
  };

  try {
    await s3.deleteObject(params).promise();
    console.log('✅ Arquivo deletado do S3:', key);
  } catch (error) {
    console.error('❌ Erro ao deletar do S3:', error);
    throw error;
  }
};

// 📥 Get Signed URL
const getSignedUrl = (key, expires = 3600) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: expires
  };

  return s3.getSignedUrl('getObject', params);
};

module.exports = {
  s3,
  uploadToS3,
  deleteFromS3,
  getSignedUrl,
  BUCKET_NAME
};
