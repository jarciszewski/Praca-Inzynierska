const { sequelize, Sequelize } = require("../db")
const { dishes_historiesSchema } = require("../models/dishes_histories")
const { dietSchema } = require("../models/diets")
const { getDishById } = require("./dishesController")
const { getMacronutrientById } = require("./macronutrientsController")
const { getIngredientById } = require("./ingredientsController")
const { getDietHasDishById } = require("./diet_has_dishesController")
const { getRecipeById } = require("./recipesController")
const asyncHandler = require('express-async-handler')
const cron = require("node-cron")

const getDishH = asyncHandler(async (req, res) => {
    const dish_h = await dishes_historiesSchema.findOne({ where: { id: req.params.id } })
    const { timestamp } = dish_h.toJSON();

    const recipe = await getRecipeById(dish_h.dish_id);
    const { dishData, ingredientData } = recipe;

    const combinedData = {
        dishData,
        ingredientData,
        timestamp
    };

    res.status(200).json({ dishData, ingredientData, timestamp });
})

const getDishHById = asyncHandler(async (id) => {
    const dish_h = await dishes_historiesSchema.findOne({ where: { id } })
    const { timestamp } = dish_h.toJSON();

    const recipe = await getRecipeById(dish_h.dish_id);
    const { dishData, ingredientData } = recipe;

    const combinedData = {
        dishData,
        ingredientData,
        timestamp
    };

    return combinedData;
});

const getDishesH = asyncHandler(async (req, res) => {
    try {
        const id = req.query.UID;
        const query = await sequelize.query("SELECT dishes_histories.dish_id, dishes_histories.timestamp, recipes.ingredients_id FROM dishes_histories "
            + "LEFT JOIN recipes ON recipes.dish_id = dishes_histories.dish_id "
            + `RIGHT JOIN users ON users.diet_id=dishes_histories.diet_id WHERE users.id=${id};`,
            { type: Sequelize.QueryTypes.SELECT });

        const detailedDataMap = new Map();
        for (const dishes of query) {
            const dishId = dishes.dish_id;

            if (!detailedDataMap.has(dishId)) {
                detailedDataMap.set(dishId, { dish: null, ingredients: [], timestamp: null });
            }
            const dishData = detailedDataMap.get(dishId);
            if (!dishData.dish) {
                dishData.dish = await getDishById(dishId);
                const timestamp = dishes.timestamp
                dishData.timestamp = timestamp
            }
            if (dishes.ingredients_id !== null) {
                const ingredient = await getIngredientById(dishes.ingredients_id);
                dishData.ingredients.push(ingredient);
            }
        }
        const dishesHistory = Array.from(detailedDataMap.values()).map(({ dish, ingredients, timestamp }) => ({ dish, ingredients, timestamp }));

        res.status(200).json({ data: [...dishesHistory] });
    } catch (error) {
        console.error("Error retrieving dishes with recipe data:", error);
        throw error;
    }
});

const getDishesHByDiet = asyncHandler(async (id) => {
    try {
        // const dietID = req.params.id;
        const query = await sequelize.query(
            'SELECT dishes_histories.dish_id ' +
            'FROM dishes_histories ' +
            'LEFT JOIN recipes ON recipes.dish_id = dishes_histories.dish_id ' +
            `RIGHT JOIN diets ON diets.id=dishes_histories.diet_id WHERE dishes_histories.diet_id=${id};`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        const dishIds = [];
        if (query && query.length > 0) {
            for (const dish of query) {
                if (dish && dish.dish_id) {
                    if (!dishIds.includes(dish.dish_id)) {
                        dishIds.push(dish.dish_id);
                    }
                }
            }
        }

        console.log(dishIds)
        // res.status(200).json(dishIds)
        return dishIds;
    } catch (error) {
        console.error("Error retrieving dishes with recipe data:", error);
        throw error;
    }
});

const postDishH = asyncHandler(async (req, res) => {
    const dish_h = await dishes_historiesSchema.create({ dish_id: req.body });
    res.status(200).json({ data: dish_h });
});

const deleteDishH = asyncHandler(async (req, res) => {
    const dish_h = await dishes_historiesSchema.findByPk(req.params.id);

    if (!dish_h) {
        res.status(500).send({ message: "No dish in history was not found" })
    }

    await dishes_historiesSchema.destroy({ where: { id: dish_h.id } });

    res.status(200).json({ data: ({ where: {} }) });
});

const deleteDishesH = asyncHandler(async (req, res) => {
    await dishes_historiesSchema.destroy({ where: {} })

    res.status(200).json({ data: {} })
})

const generateDiet = asyncHandler(async (req, res) => {
    try {
        const currentDay = new Date().getDay();
        if (currentDay === 1) {
            await dishes_historiesSchema.destroy({ where: {} });
        }
        const diets = await dietSchema.findAll({});

        for (const diet of diets) {
            const dietId = diet.id;
            const dietCalories = diet.calories;

            const maxCalories = [Math.floor(dietCalories * 0.35), Math.floor(dietCalories * 0.5), Math.floor(dietCalories * 0.2)]
            const minCalories = [Math.floor(dietCalories * 0.3), Math.floor(dietCalories * 0.45), Math.floor(dietCalories * 0.15)]

            const maxFats = [Math.floor(maxCalories[0] / 8 * 0.2), Math.floor(maxCalories[1] / 8 * 0.2), Math.floor(maxCalories[2] / 8 * 0.2)]

            const getDishesByMealTimeAndDiet = async (mealTime) => {
                const dietData = await getDietHasDishById(dietId);
                const allDishes = dietData.dishes;
                const filteredDishes = allDishes.filter(dish => dish.meal_time === mealTime);
                return filteredDishes;
            };

            const getRandomDishByMealTime = async (dishes, minCal, maxCal, fats) => {
                let selectedDish;
                while (!selectedDish && dishes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * dishes.length);
                    const randomDish = dishes[randomIndex];
                    const macronutrientData = await getMacronutrientById(randomDish.macronutrientData.id);
                    if (macronutrientData && macronutrientData.calories >= minCal&& macronutrientData.calories <= maxCal && macronutrientData.fats <= fats) {
                        selectedDish = randomDish;
                    } else {
                        dishes.splice(randomIndex, 1);
                    }
                }
                return selectedDish;
            };

            const timestamp = new Date();

            try {
                let existingDishIds = await getDishesHByDiet(dietId);

                const breakfastDishes = await getDishesByMealTimeAndDiet("Breakfast", dietId);
                const dinnerDishes = await getDishesByMealTimeAndDiet("Dinner", dietId);
                const supperDishes = await getDishesByMealTimeAndDiet("Supper", dietId);

                const suitableBreakfastDishes = breakfastDishes.filter(dish => !existingDishIds.includes(dish.id));
                const suitableDinnerDishes = dinnerDishes.filter(dish => !existingDishIds.includes(dish.id));
                const suitableSupperDishes = supperDishes.filter(dish => !existingDishIds.includes(dish.id));

                const breakfastDish = await getRandomDishByMealTime(suitableBreakfastDishes, minCalories[0], maxCalories[0], maxFats[0]);
                const dinnerDish = await getRandomDishByMealTime(suitableDinnerDishes, minCalories[1], maxCalories[1], maxFats[1]);
                const supperDish = await getRandomDishByMealTime(suitableSupperDishes, minCalories[2], maxCalories[2], maxFats[2]);

                if (breakfastDish && dinnerDish && supperDish) {
                    await Promise.all([
                        dishes_historiesSchema.create({ diet_id: dietId, dish_id: breakfastDish.id, timestamp }),
                        dishes_historiesSchema.create({ diet_id: dietId, dish_id: dinnerDish.id, timestamp }),
                        dishes_historiesSchema.create({ diet_id: dietId, dish_id: supperDish.id, timestamp }),
                    ]);
                    console.log("Algorithm executed successfully for diet ", dietId);
                } else {
                    console.log("Couldn't find suitable dishes for diet ", dietId);
                }
            } catch (error) {
                console.error("Error processing diet: ", dietId, error.message);
                continue;
            }
        }
        res.status(200).send("Diet generation completed successfully");
    } catch (error) {
        console.error("Error in algorithm:", error);
        res.status(500).send("Internal server error");
    }
});

cron.schedule("00 02 * * *", generateDiet);

module.exports = { getDishesHByDiet, getDishHById, getDishesH, postDishH, deleteDishH, deleteDishesH, generateDiet }