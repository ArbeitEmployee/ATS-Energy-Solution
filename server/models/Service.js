const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, default: '/contact' }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
