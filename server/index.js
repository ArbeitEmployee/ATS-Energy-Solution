const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Security & Utility Middlewares
app.use(helmet());
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'https://atsenergy.vercel.app',
  'https://ats-energy-solution.vercel.app'
];
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl) or in allowed list
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev/testing
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Fallback in-memory cache/data if MongoDB is not running locally yet
const { categories: fallbackCategories, products: fallbackProducts } = require('./data/seedData');

app.get('/api/health', (req, res) => {
  res.json({ status: 'active', serverTime: new Date().toISOString(), company: 'ATS Energy Solutions' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Fallback for static mock when Mongo is offline
app.get('/api/mock/products', (req, res) => {
  res.json({ success: true, count: fallbackProducts.length, data: fallbackProducts });
});
app.get('/api/mock/categories', (req, res) => {
  res.json({ success: true, count: fallbackCategories.length, data: fallbackCategories });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`ATS Energy BD Backend server running on port ${PORT}`);
  });
}

module.exports = app;
