const { ingredientsSchema } = require("../models/ingredients")
const { getMacronutrientById } = require("./macronutrientsController")
const asyncHandler = require('express-async-handler')

const getIngredient = asyncHandler(async (req, res) => {
    const ingredient = await ingredientsSchema.findOne({ where: { id: req.params.id } })

    const { name } = ingredient.toJSON()

    let macronutrientData = null
    if (ingredient.macronutrients_id) {
        macronutrientData = await getMacronutrientById(ingredient.macronutrients_id)
    }

    res.status(200).json({ name, macronutrientData })
})

const getIngredientById = asyncHandler(async (id) => {
    const ingredient = await ingredientsSchema.findOne({ where: { id } })

    const { name } = ingredient.toJSON()

    let macronutrientData = null
    if (ingredient.macronutrients_id) {
        macronutrientData = await getMacronutrientById(ingredient.macronutrients_id)
    }

    return {name}
})

const getIngredients = asyncHandler(async (req, res) => {
    const ingredients = await ingredientsSchema.findAll()

    const data = await Promise.all(
        ingredients.map(async (ingredient) => {
            return await getIngredientById(ingredient.id)
        })
    )

    res.status(200).json({ data })
})

const postIngredients = asyncHandler(async (req, res) => {
    const { name, macronutrients_id } = req.body;

    const ingredient = await ingredientsSchema.create({
        name,
        macronutrients_id
    });

    res.status(200).json({ data: ingredient })
})

const patchIngredient = asyncHandler(async (req, res) => {
    const { name, macronutrients_id, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Missing 'id' in the request body" });
    }

    const updateData = {
        name, macronutrients_id
    };

    const [rowsUpdated] = await ingredientsSchema.update(updateData, {
        where: { id },
    });

    if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Ingredient not found" });
    }

    const updatedIngredient = await ingredientsSchema.findByPk(id);
    res.status(200).json({ data: updatedIngredient });
});

const deleteIngredient = asyncHandler(async (req, res) => {
    const ingredient = await ingredientsSchema.findByPk(req.params.id);

    if (!ingredient) {
        res.status(500).send({ message: "Ingredient not found" })
    }

    await ingredientsSchema.destroy({ where: { id: ingredient.id } });

    res.status(200).json({ data: {} })
})

module.exports = { getIngredient, getIngredientById, getIngredients, postIngredients, patchIngredient, deleteIngredient }