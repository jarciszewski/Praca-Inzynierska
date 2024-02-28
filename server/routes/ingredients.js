const router = require("express").Router()
const { getIngredient, getIngredients, postIngredients, patchIngredient, deleteIngredient } = require("../controllers/ingredientsController")

router.route('/')
    .get(getIngredients)
    .post(postIngredients)
    .patch(patchIngredient)
router.route('/:id')
    .get(getIngredient)
    .delete(deleteIngredient)

module.exports = router