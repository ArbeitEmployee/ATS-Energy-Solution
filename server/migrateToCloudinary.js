require('dotenv').config();
const { cloudinary, getCorrectedTimestamp, syncTimeOffset } = require('./config/cloudinary');
const { categories, products } = require('./data/seedData');
const fs = require('fs');
const path = require('path');

const uploadFromUrl = async (url, folder = 'atsenergybd/migrated') => {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return url;
  }
  // If already cloudinary url, skip
  if (url.includes('cloudinary.com') || url.includes('res.cloudinary.com')) {
    return url;
  }

  try {
    console.log(`Uploading to Cloudinary: ${url}`);
    const timestamp = getCorrectedTimestamp();
    const res = await cloudinary.uploader.upload(url, {
      folder,
      timestamp,
      resource_type: 'image'
    });
    console.log(`Uploaded -> ${res.secure_url}`);
    return res.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${url}:`, err.message);
    return url; // fallback to original url if error
  }
};

const runMigration = async () => {
  console.log('=== Starting Image Migration to Cloudinary ===');
  await syncTimeOffset();

  // 1. Migrate Categories
  console.log(`Migrating ${categories.length} Categories...`);
  const updatedCategories = [];
  for (const cat of categories) {
    const updated = { ...cat };
    if (cat.image) {
      updated.image = await uploadFromUrl(cat.image, 'atsenergybd/categories');
    }
    if (cat.banner) {
      updated.banner = await uploadFromUrl(cat.banner, 'atsenergybd/categories');
    }
    updatedCategories.push(updated);
  }

  // 2. Migrate Products
  console.log(`Migrating ${products.length} Products...`);
  const updatedProducts = [];
  for (const prod of products) {
    const updated = { ...prod };
    if (prod.mainImage) {
      updated.mainImage = await uploadFromUrl(prod.mainImage, 'atsenergybd/products');
    }
    if (Array.isArray(prod.gallery) && prod.gallery.length > 0) {
      const newGallery = [];
      for (const gUrl of prod.gallery) {
        newGallery.push(await uploadFromUrl(gUrl, 'atsenergybd/products'));
      }
      updated.gallery = newGallery;
    }
    updatedProducts.push(updated);
  }

  // 3. Save Cloudinary data back to a dedicated file
  const outPath = path.join(__dirname, 'data', 'seedData_cloudinary.json');
  fs.writeFileSync(outPath, JSON.stringify({ categories: updatedCategories, products: updatedProducts }, null, 2));
  console.log(`Successfully saved Cloudinary updated dataset to: ${outPath}`);
  console.log('=== Migration Complete ===');
};

runMigration();
