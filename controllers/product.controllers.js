
const Product = require('../models/Product.model');

module.exports.productController = {
  postProduct: async (req, res) => {
    try {
      await Product.create({
        user: req.body.user,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
      });
      res.json('Product created');
    } catch (err) {
      res.json('Issues when creating product');
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const allProducts = await Product.find({});
      res.json(allProducts);
    } catch (err) {
      res.json('Issue when getting all products');
    }
  },

  getProductById: async (req, res) => {
    try {
      const oneProduct = await Product.findById(req.params.id);
      res.json(oneProduct);
    } catch (err) {
      res.json('Issue when getting product by id');
    }
  },

  patchProduct: async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.id, {
        user: req.body.user,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
      });
      res.json('Product updated');
    } catch (err) {
      res.json('Issues when changing product');
    }
  },
  deleteProductById: async (req, res) => {
    try {
      await Product.findByIdAndRemove(req.params.id);
      res.json('Product has been removed');
    } catch (err) {
      res.json('Issues when removing product');
    }
  },
};
