const router = require("express").Router()
const { getDishes, getDish, postDishes, patchDishes, deleteDish } = require("../controllers/dishesController")

router.route('/')
    .get(getDishes)
    .post(postDishes)
    .patch(patchDishes)
router.route('/:id')
    .get(getDish)
    .delete(deleteDish)

module.exports = router