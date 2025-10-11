// ✂️ CLIPS ROUTES
const express = require('express');
const router = express.Router();
const {
  generateClips,
  getClipsByVideo,
  downloadClip,
  deleteClip
} = require('../controllers/clips.controller');
const { protect } = require('../middlewares/auth');

router.post('/generate', protect, generateClips);
router.get('/:videoId', protect, getClipsByVideo);
router.get('/download/:id', protect, downloadClip);
router.delete('/:id', protect, deleteClip);

module.exports = router;
