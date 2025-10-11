// 📤 UPLOAD ROUTES
const express = require('express');
const router = express.Router();
const {
  uploadVideo,
  uploadBackgrounds,
  getMyVideos,
  deleteVideo
} = require('../controllers/upload.controller');
const { protect, admin } = require('../middlewares/auth');
const { uploadSingle, uploadMultiple, handleUploadError } = require('../middlewares/upload');

router.post('/video', protect, uploadSingle, handleUploadError, uploadVideo);
router.post('/backgrounds', protect, admin, uploadMultiple, handleUploadError, uploadBackgrounds);
router.get('/my-videos', protect, getMyVideos);
router.delete('/:id', protect, deleteVideo);

module.exports = router;
