const Product = require('../models/Product');
const Category = require('../models/Category');
const { products: fallbackProducts } = require('../data/seedData');

// @desc    Get all products (with search, category filter, pagination)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { category, subcategory, search, featured, page = 1, limit = 20 } = req.query;
    let query = {};

    if (category) {
      // Find category by slug or name to handle both slug and name query params
      const matchedCat = await Category.findOne({
        $or: [
          { slug: category },
          { name: { $regex: new RegExp(`^${category}$`, 'i') } }
        ]
      });

      if (matchedCat) {
        query.category = matchedCat.name;
      } else {
        query.category = { $regex: new RegExp(category.replace(/-/g, '.*'), 'i') };
      }
    }
    if (subcategory) {
      query.subcategory = { $regex: new RegExp(subcategory, 'i') };
    }
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: products
    });
  } catch (error) {
    // Graceful fallback to seeded Cloudinary products if DB disconnected
    res.json({
      success: true,
      count: fallbackProducts.length,
      total: fallbackProducts.length,
      totalPages: 1,
      currentPage: 1,
      data: fallbackProducts
    });
  }
};

// @desc    Get single product by slug or id
// @route   GET /api/products/:slugOrId
exports.getProduct = async (req, res) => {
  try {
    const param = req.params.slugOrId;
    let product;

    if (param.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(param);
    } else {
      product = await Product.findOne({ slug: param });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Related products in the same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);

    res.json({
      success: true,
      data: product,
      relatedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productData = { ...req.body, slug };

    const product = await Product.create(productData);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
