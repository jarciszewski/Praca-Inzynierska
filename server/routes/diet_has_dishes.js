const router = require("express").Router()
const { getDiet , getDiets, postDiets, deleteDiets, patchDiet} = require("../controllers/diet_has_dishesController")

router.route('/')
    .get(getDiets)
    .post(postDiets)
    .patch(patchDiet)
    .delete(deleteDiets)
router.route('/:diet_id')
    .get(getDiet)

module.exports = router