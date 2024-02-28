const { diet_has_dishesSchema } = require("../models/diet_has_dishes")
const { getDishById } = require("./dishesController")
const { getDietById } = require("./dietsController")
const asyncHandler = require('express-async-handler')

const getDiet = asyncHandler(async (req, res) => {
    const diets = await diet_has_dishesSchema.findAll({ where: { diet_id: req.params.diet_id } });

    const allDishes = [];
    const dietData = await getDietById(req.params.diet_id);
    
    for (const diet of diets) {
        const dishData = await getDishById(diet.dish_id);
        allDishes.push(dishData);
    }

    const response = {
        diet: dietData,
        dishes: allDishes
    };

    res.status(200).json({ data: response });
});

const getDietHasDishById = asyncHandler(async (id) => {
    const diets = await diet_has_dishesSchema.findAll({ where: { diet_id: id } });

    const allDishes = [];
    const dietData = await getDietById(id);

    for (const diet of diets) {
        const dishData = await getDishById(diet.dish_id);
        allDishes.push(dishData);
    }
    
    const response = {
        diet: dietData,
        dishes: allDishes
    };
    return response;
});

const getDiets = asyncHandler(async (req, res) => {
    const diets = await diet_has_dishesSchema.findAll()

    const detailedData = await Promise.all(
        diets.map(async (diet) => {
            const dietData = await getDishById(diet.dish_id);
            return { name: diet.name, dietData };
        })
    );

    res.status(200).json({ data: detailedData })
})

const postDiets = asyncHandler(async (req, res) => {
    const diet = await diet_has_dishesSchema.create({ dish_id: req.body });
    res.status(200).json({ data: diet });
});

const patchDiet = asyncHandler(async (req, res) => {
    const { diet_id, dish_id } = req.body;

    if (!diet_id) {
        return res.status(400).json({ error: "Missing 'diet_id' in the request body" });
    }

    if (!dish_id) {
        return res.status(400).json({ error: "Missing 'dish_id' in the request body" });
    }

    const updateData = {
        diet_id, dish_id
    };

    const [rowsUpdated] = await diet_has_dishesSchema.update(updateData, {
        where: { id },
    });

    if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Diet with that dish was not found" });
    }

    const updatedDiet = await diet_has_dishesSchema.findByPk(id);
    res.status(200).json({ data: updatedDiet });
});

const deleteDiets = asyncHandler(async (req, res) => {
    await diet_has_dishesSchema.destroy({where: {} });

    res.status(200).json({ data: {} })
})

module.exports = { getDiet, getDietHasDishById, getDiets, postDiets, patchDiet, deleteDiets }