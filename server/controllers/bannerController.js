const Banner = require('../models/Banner');

// Default initial banners from ATS Energy
const initialBanners = [
  {
    title: "ATS Pure Copper Cables & Wiring Solutions",
    subtitle: "High Conductivity BDS 900 Standard Certified",
    imageUrl: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.37-1-768x305.jpeg",
    linkUrl: "/products?category=wiring-cables",
    order: 1,
    isActive: true
  },
  {
    title: "Commercial LED Lighting & Energy Savers",
    subtitle: "AC LEDs 5W to 22W & Smart 12W Emergency Lights",
    imageUrl: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-2-768x305.jpeg",
    linkUrl: "/products?category=lighting-solutions",
    order: 2,
    isActive: true
  },
  {
    title: "Heavy-Duty Switches, MCBs & Solar Systems",
    subtitle: "Trusted Dealership Business Across Bangladesh",
    imageUrl: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-3-768x305.jpeg",
    linkUrl: "/products?category=electrical-accessories",
    order: 3,
    isActive: true
  }
];

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    if (!banners || banners.length === 0) {
      return res.json({ success: true, count: initialBanners.length, data: initialBanners });
    }
    res.json({ success: true, count: banners.length, data: banners });
  } catch (error) {
    res.json({ success: true, count: initialBanners.length, data: initialBanners });
  }
};

exports.getAllBannersAdmin = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: banners.length, data: banners.length > 0 ? banners : initialBanners });
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
