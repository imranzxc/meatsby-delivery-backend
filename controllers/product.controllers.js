const Product = require('../models/Product.model');

module.exports.productController = {
  postProduct: async (req, res) => {
    try {
      await Product.create({
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        image01: req.file.path1,
        image02: req.file.path2,
        image03: req.file.path3,
        category: req.body.category,
        desc: req.body.desc,
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
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        image01: req.file.path1,
        image02: req.file.path2,
        image03: req.file.path3,
        category: req.body.category,
        desc: req.body.desc,
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
