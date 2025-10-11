// 📤 POSTS ROUTES
const express = require('express');
const router = express.Router();
const {
  schedulePost,
  getPosts,
  getPost,
  cancelPost
} = require('../controllers/posts.controller');
const { protect } = require('../middlewares/auth');

router.post('/schedule', protect, schedulePost);
router.get('/', protect, getPosts);
router.get('/:id', protect, getPost);
router.delete('/:id', protect, cancelPost);

module.exports = router;
