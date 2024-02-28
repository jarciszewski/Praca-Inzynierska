const router = require("express").Router()
const { getDishesHByDiet, postDishH, deleteDishH, getDishesH, deleteDishesH, generateDiet } = require("../controllers/dishes_historiesController")

router.route('/generate-diet')
    .get(generateDiet)
router.route('/')
    .get(getDishesH)
    .post(postDishH)
    .delete(deleteDishesH)
router.route('/:id')
    .delete(deleteDishH);

module.exports = router