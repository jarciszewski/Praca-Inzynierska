const { macronutrientsSchema } = require("../models/macronutrients")
const asyncHandler = require('express-async-handler')

const getMacronutrient = asyncHandler(async (req, res) => {
    try {
        const macronutrient = await macronutrientsSchema.findOne({
            where: { id: req.params.id }
        });

        if (!macronutrient) {
            return res.status(404).json({ error: "Macronutrient not found" });
        }
        if (res && res.status) {
            res.status(200).json({ data: macronutrient });
        } else {
            console.error("Error: 'res' is not defined or does not have a 'status' property");
        }
    } catch (error) {
        console.error("Error getting macronutrient:", error);
        if (res && res.status) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

const getMacronutrientById = asyncHandler(async (id) => {
    return await macronutrientsSchema.findOne({ where: { id } });
});

const getMacronutrients = asyncHandler(async (req, res) => {
    const macronutrient = await macronutrientsSchema.findAll();
    res.status(200).json({ data: macronutrient });
});

const postMacronutrients = asyncHandler(async (req, res) => {
    const { calories, fats, carbohydrates, proteins, glycemic_index, amount } = req.body;

    const macronutrient = await macronutrientsSchema.create({
        calories,
        fats,
        carbohydrates,
        proteins,
        glycemic_index,
        amount
    });

    res.status(200).json({ data: macronutrient });
});

const patchMacronutrients = asyncHandler(async (req, res) => {
    const { calories, fats, carbohydrates, proteins, glycemic_index, amount, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Missing 'id' in the request body" });
    };

    const updateData = {
        calories, fats, carbohydrates, proteins, glycemic_index, amount
    };

    const [rowsUpdated] = await macronutrientsSchema.update(updateData, {
        where: { id },
    });

    if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Macronutrient not found" });
    };

    const updatedMacronutrient = await macronutrientsSchema.findByPk(id);
    res.status(200).json({ data: updatedMacronutrient });
});

const deleteMacronutrient = asyncHandler(async (req, res) => {
    const macronutrient = await macronutrientsSchema.findByPk(req.params.id);

    if (!macronutrient) {
        res.status(500).send({ message: "Macronutrient not found" })
    }

    await macronutrientsSchema.destroy({ where: { id: macronutrient.id } });

    res.status(200).json({ data: {} })
});

module.exports = { getMacronutrient, getMacronutrientById, getMacronutrients, postMacronutrients, patchMacronutrients, deleteMacronutrient }