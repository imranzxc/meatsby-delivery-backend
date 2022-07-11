const Ingredient = require('../models/Ingredient.model');

module.exports.ingredientController = {
  postIngredient: async (req, res) => {
    try {
      await Ingredient.create({
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
        calorie: req.body.calorie,
      });
      res.json('Ingredient created');
    } catch (err) {
      res.json('Issues when adding ingredient');
    }
  },
  getAllIngredients: async (req, res) => {
    try {
      const allIngredients = await Ingredient.find({});
      res.json(allIngredients);
    } catch (err) {
      res.json('Issue when getting all Ingredients');
    }
  },

  getIngredientById: async (req, res) => {
    try {
      const oneIngredient = await Ingredient.findById(req.params.id);
      res.json(oneIngredient);
    } catch (err) {
      res.json('Issue when getting ingredient by id');
    }
  },

  patchIngredient: async (req, res) => {
    try {
      await Ingredient.findByIdAndUpdate(req.params.id, {
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
        calorie: req.body.calorie,
      });
      res.json('Ingredient updated');
    } catch (err) {
      res.json('Issues when changing ingredient');
    }
  },
  deleteIngredientById: async (req, res) => {
    try {
      await Ingredient.findByIdAndRemove(req.params.id);
      res.json('Ingredient has been removed');
    } catch (err) {
      res.json('Issues when removing ingredient');
    }
  },
};
