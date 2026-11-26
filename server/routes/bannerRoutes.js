const express = require('express');
const router = express.Router();
const { getBanners, getAllBannersAdmin, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getBanners)
  .post(protect, createBanner);

router.route('/admin')
  .get(protect, getAllBannersAdmin);

router.route('/:id')
  .put(protect, updateBanner)
  .delete(protect, deleteBanner);

module.exports = router;
