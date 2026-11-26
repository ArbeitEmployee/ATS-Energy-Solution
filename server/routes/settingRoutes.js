const express = require('express');
const router = express.Router();
const { getAllSettings, getSettingByKey, upsertSetting } = require('../controllers/settingController');
const { protect } = require('../middleware/auth');

router.get('/', getAllSettings);
router.route('/:key')
  .get(getSettingByKey)
  .put(protect, upsertSetting);

module.exports = router;
