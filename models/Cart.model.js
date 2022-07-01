const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
    default: null,
  },
  products: [
    {
      ref: "Product",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  sum: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Cart', CartSchema);



