// 👑 ADMIN ROUTES
const express = require('express');
const router = express.Router();
const {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  getStats,
  getLogs
} = require('../controllers/admin.controller');
const { protect, admin } = require('../middlewares/auth');

router.use(protect, admin); // Todas rotas requerem admin

router.post('/profiles', createProfile);
router.get('/profiles', getProfiles);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);
router.get('/stats', getStats);
router.get('/logs', getLogs);

module.exports = router;
