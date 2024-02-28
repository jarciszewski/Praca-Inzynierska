const router = require("express").Router()
const { getMacronutrient, getMacronutrients, postMacronutrients, patchMacronutrients, deleteMacronutrient } = require("../controllers/macronutrientsController")

router.route('/')
    .get(getMacronutrients)
    .post(postMacronutrients)
    .patch(patchMacronutrients)
router.route('/:id')
    .get(getMacronutrient)
    .delete(deleteMacronutrient)

module.exports = router