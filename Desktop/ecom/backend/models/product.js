const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: { type: String, required: true },
  sizes: [Number],
  isNewProduct: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);






