// 📊 ANALYTICS ROUTES
const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getDashboard
} = require('../controllers/analytics.controller');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getAnalytics);
router.get('/dashboard', protect, getDashboard);

module.exports = router;
