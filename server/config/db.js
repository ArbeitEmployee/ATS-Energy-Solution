const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  const uri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MongoDB Atlas URI is not defined in environment variables');
  }

  console.log('Connecting to MongoDB Atlas Cluster...');
  cachedPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  }).then((conn) => {
    console.log(`✅ MongoDB Atlas Connected Successfully: ${conn.connection.host}`);
    return conn;
  }).catch((error) => {
    cachedPromise = null;
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
    throw error;
  });

  return cachedPromise;
};

module.exports = connectDB;
