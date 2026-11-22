require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Admin = require('./models/Admin');
const Banner = require('./models/Banner');
const cloudinaryData = require('./data/seedData_cloudinary.json');
const { initialBanners } = require('./controllers/bannerController');

const seedDB = async () => {
  const uri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/atsenergybd';
  try {
    console.log(`Connecting to MongoDB for Seeding (${uri.includes('cluster') ? 'Atlas' : 'Local'})...`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected successfully!');

    // Clear existing
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Admin.deleteMany({});
    await Banner.deleteMany({});

    // Seed Categories
    await Category.insertMany(cloudinaryData.categories);
    console.log(`Seeded ${cloudinaryData.categories.length} Categories.`);

    // Seed Products
    await Product.insertMany(cloudinaryData.products);
    console.log(`Seeded ${cloudinaryData.products.length} Products.`);

    // Seed Banners
    if (initialBanners && initialBanners.length > 0) {
      await Banner.insertMany(initialBanners);
      console.log(`Seeded ${initialBanners.length} Banners.`);
    }

    // Seed Default Admin
    await Admin.create({
      name: 'ATS Admin',
      email: 'admin@atsenergybd.com',
      password: 'adminpassword123',
      role: 'superadmin'
    });
    console.log('Default Admin Created (admin@atsenergybd.com / adminpassword123)');

    console.log('=== Database Seeding Complete! ===');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Error:', err.message);
    process.exit(1);
  }
};

seedDB();
