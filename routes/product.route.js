const { Router } = require('express')
const { productController } = require('../controllers/product.controllers')
const router = Router()
const fileMiddleware = require("../middleware/file")

router.post('/product', fileMiddleware.single("img"), productController.postProduct)
router.get('/product', productController.getAllProducts)
router.get('/product/:id', productController.getProductById)
router.delete('/product/:id', productController.deleteProductById)
router.patch('/product/:id', productController.patchProduct)

module.exports = router