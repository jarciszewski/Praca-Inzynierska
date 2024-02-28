const { recipeSchema } = require("../models/recipes")
const asyncHandler = require('express-async-handler')

const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await recipeSchema.findAll({
        attributes: { exclude: ['id'] }
    });

    res.status(200).json({ data: recipes });
});


const postRecipes = asyncHandler(async (req, res) => {
    const { dish_id, ingredients_id } = req.body;

    const recipe = await recipeSchema.create({
        dish_id,
        ingredients_id
    });

    res.status(200).json({ recipe });
});

const deleteRecipes = asyncHandler(async (req, res) => {
    await recipeSchema.destroy({ where: {} })

    res.status(200).json({ data: {} })
})

module.exports = { getRecipes, postRecipes, deleteRecipes }