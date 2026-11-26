const Banner = require('../models/Banner');

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, count: banners.length, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

exports.getAllBannersAdmin = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: banners.length, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Banner removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
