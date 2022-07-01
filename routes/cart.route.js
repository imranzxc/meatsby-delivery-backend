const { Router } = require('express');

const { cartController } = require('../controllers/cart.controller');

const router = Router();

router.post('/cart', cartController.postCart);
router.patch('/user/:userId/:id', cartController.addIngredient);
router.patch('/returnPill/:id', cartController.returnIngredient);
router.patch('/user/:id', cartController.clearCart);
router.patch('/user/:userId/cart/:id', cartController.buyProduct);
router.patch('/cash/:userId', cartController.cashRefill);

module.exports = router;
