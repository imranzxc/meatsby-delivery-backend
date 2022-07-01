const Cart = require('../models/Cart.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const Ingredient = require('../models/Ingredient.model');

module.exports.cartController = {
  // Cart creating
  postCart: async (req, res) => {
    try {
      const cart = await Cart.create({
        user: req.body.userId,
      });
      res.status(201).json(cart);
    } catch (err) {
      res.json('Issue when creating cart');
    }
  },

  // adding pill to shopping cart
  addIngredient: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      if (cart.user == req.params.userId) {
        await Cart.findByIdAndUpdate(req.params.id, {
          $push: { products: req.body.products },
          $set: { sum: cart.sum + pill.price },
        });
        res.json('Ingredient has been added in your product cart');
      } else {
        return res.json('You dont have product cart');
      }
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  // returning pill from the product cart

  returnIngredient: async (req, res) => {
    try {
      const ingredient = await Ingredient.findById(req.body.products);
      const cart = await Cart.findById(req.params.id);

      if (cart.products.includes(req.body.products)) {
        await Cart.findByIdAndUpdate(cart, {
          $pull: { products: req.body.products },
          sum: cart.sum - ingredient.price,
        });
        return res.json('Ingredient was removed from cart');
      } else {
        res.json('issue when removing ingredient');
      }
    } catch (err) {
      res.json(err);
    }
  },

  //removing all products from cart
  clearCart: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        products: [],
        sum: null,
      });
      res.json('Cart is clear');
    } catch (err) {
      res.json(err);
    }
  },

  // buying pill
  buyProduct: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      const user = await User.findById(req.params.userId);

      if (cart.sum > user.cash) {
        return res
          .status(500)
          .json({ error: 'You dont have enough money to buy items in your product cart' });
      }
      await User.findByIdAndUpdate(cart.user, {
        cash: user.cash - cart.sum,
      });
      await Cart.findByIdAndUpdate(req.params.id, {
        products: [],
        sum: null,
      });
      res.json('Payment accepted');
    } catch (err) {
      res.json(err);
    }
  },

  //adding money to cash
  cashRefill: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      await User.findByIdAndUpdate(req.params.userId, {
        cash: user.cash + req.body.cash,
      });
      res.json('Cash has been refilled');
    } catch (err) {
      res.json(err);
    }
  },
};
