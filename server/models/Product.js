const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  shortDescription: { type: String },
  description: { type: String },
  mainImage: { type: String, required: true },
  gallery: [{ type: String }],
  videoUrl: { type: String },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  warranty: { type: String },
  brand: { type: String, default: 'ATS Energy' },
  attributes: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  features: [{ type: String }],
  applications: [{ type: String }],
  featured: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  brochureUrl: { type: String }
}, { timestamps: true });

ProductSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
