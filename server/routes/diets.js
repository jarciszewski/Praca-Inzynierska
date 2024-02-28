const router = require("express").Router()
const { getDiet, getDietByUser, getDiets, postDiets, deleteDiet, patchDiet } = require("../controllers/dietsController")

router.route('/')
    .get(getDiets)
    .post(postDiets)
    .patch(patchDiet)
router.route('/:id')
    .get(getDiet)
    .delete(deleteDiet)
// router.route('/uid/:UID')
//     .get(getDietByUser);
router.route("/find")
    .get(getDiet)

module.exports = router