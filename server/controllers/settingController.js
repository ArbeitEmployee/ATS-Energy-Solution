const SiteSetting = require('../models/SiteSetting');

// @desc    Get all site settings as a key-value map
// @route   GET /api/settings
exports.getAllSettings = async (req, res) => {
  try {
    const docs = await SiteSetting.find();
    const map = {};
    for (const doc of docs) {
      map[doc.key] = doc.value;
    }
    res.json({ success: true, data: map });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single site setting by key
// @route   GET /api/settings/:key
exports.getSettingByKey = async (req, res) => {
  try {
    const doc = await SiteSetting.findOne({ key: req.params.key });
    res.json({ success: true, data: doc ? doc.value : null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create or update site setting by key (Admin)
// @route   PUT /api/settings/:key
exports.upsertSetting = async (req, res) => {
  try {
    const { value } = req.body;
    const doc = await SiteSetting.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, value },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: doc.value });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
