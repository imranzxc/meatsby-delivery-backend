const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const ingredientSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    name: String,
    price: Number,
    calorie: Number,
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
