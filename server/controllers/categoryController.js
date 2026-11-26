const Category = require('../models/Category');
const { categories: fallbackCategories } = require('../data/seedData');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const category = await Category.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const param = req.params.id;
    const filter = param.match(/^[0-9a-fA-F]{24}$/) ? { _id: param } : { slug: param };
    const category = await Category.findOneAndUpdate(filter, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const param = req.params.id;
    const filter = param.match(/^[0-9a-fA-F]{24}$/) ? { _id: param } : { slug: param };
    const category = await Category.findOneAndDelete(filter);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
