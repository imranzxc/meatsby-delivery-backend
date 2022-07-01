const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: {
    type: Number,
    default: 0,
    trim: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
