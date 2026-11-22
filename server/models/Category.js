const mongoose = require('mongoose');

const SubSubCategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true }
});

const SubCategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  subSubCategories: [SubSubCategorySchema]
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  banner: { type: String },
  description: { type: String },
  icon: { type: String },
  subcategories: [{ type: String }],
  subCategoriesList: [SubCategorySchema]
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
