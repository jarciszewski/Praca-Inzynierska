const router = require("express").Router()
const {getRecipes, postRecipes, deleteRecipes} = require("../controllers/recipesController")

router.route('/')
    .get(getRecipes)
    .post(postRecipes)
    .delete(deleteRecipes)

module.exports = router