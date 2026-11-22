const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  company: { type: String },
  productOfInterest: { type: String },
  message: { type: String, default: 'Inquiry received' },
  status: { type: String, enum: ['new', 'in-review', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);
