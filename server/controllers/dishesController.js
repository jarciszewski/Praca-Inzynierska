const { dishesSchema } = require("../models/dishes");
const { getMacronutrientById } = require("./macronutrientsController")
const asyncHandler = require('express-async-handler');

const getDish = asyncHandler(async (req, res) => {
    const dishes = await dishesSchema.findOne({ where: { id: req.params.id } });

    const macronutrientData = await getMacronutrientById(dishes.macronutrients_id);

    const { id, name, description, meal_time } = dishes.toJSON();

    const combinedData = {
        id,
        name,
        description,
        meal_time,
        macronutrientData: macronutrientData.toJSON()
    };

    res.status(200).json({ data: combinedData });
});

const getDishById = asyncHandler(async (dish_id) => {
    const dishes = await dishesSchema.findOne({ where: { id: dish_id } });

    const macronutrientData = await getMacronutrientById(dishes.macronutrients_id);

    const { id, name, description, meal_time } = dishes.toJSON();

    const combinedData = {
        id,
        name,
        description,
        meal_time,
        macronutrientData: macronutrientData.toJSON()
    };

    return combinedData;
});

const getDishes = asyncHandler(async (req, res) => {
    const dishes = await dishesSchema.findAll();

    const detailedData = await Promise.all(
        dishes.map(async (dish) => {
            const dish2 = await getDishById(dish.id)
            return { name: dish2};
        })
    )

    res.status(200).json({ data: detailedData });
});

const postDishes = asyncHandler(async (req, res) => {
    const { name, description, meal_time, macronutrients_id } = req.body;

    const dish = await dishesSchema.create({
        name,
        description,
        meal_time,
        macronutrients_id
    });

    res.status(200).json({ data: dish });
});

const patchDishes = asyncHandler(async (req, res) => {
    const { id, dish_name, description, meal_time, macronutrients_id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Missing 'id' in the request body" });
    }

    const updateData = {
        dish_name, description, meal_time, macronutrients_id
    };

    const [rowsUpdated] = await dishesSchema.update(updateData, {
        where: { id },
    });

    if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Dish not found" });
    }

    const updatedDish = await dishesSchema.findByPk(id);
    res.status(200).json({ data: updatedDish });
});

const deleteDish = asyncHandler(async (req, res) => {
    const dish = await dishesSchema.findByPk(req.params.id);

    if (!dish) {
        res.status(500).send({ message: "Dish not found" })
    }

    await dishesSchema.destroy({ where: { id: dish.id } });

    res.status(200).json({ data: {} })
});

module.exports = { getDish, getDishById, getDishes, postDishes, patchDishes, deleteDish };