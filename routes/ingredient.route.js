const { Router } = require('express');
const { ingredientController } = require('../controllers/ingredient.controller');
const router = Router();

router.post('/ingredient', ingredientController.postIngredient);
router.get('/ingredient', ingredientController.getAllIngredients);
router.get('/ingredient/:id', ingredientController.getIngredientById);
router.delete('/ingredient/:id', ingredientController.deleteIngredientById);
router.patch('/ingredient/:id', ingredientController.patchIngredient);

module.exports = router;
