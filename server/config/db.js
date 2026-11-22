const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;
  try {
    console.log('Connecting to MongoDB Atlas Cluster...');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`✅ MongoDB Atlas Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
