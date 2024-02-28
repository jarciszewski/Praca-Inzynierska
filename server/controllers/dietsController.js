const { dietSchema } = require("../models/diets")
const { getUserById } = require("./userController")
const asyncHandler = require('express-async-handler')

const getDiet = asyncHandler(async (req, res) => {
    try {
        const { name, calories } = req.query;

        const diet = await dietSchema.findOne({
            where: {
                name: name,
                calories: calories
            }
        });

        if (!diet) {
            return res.status(404).json({ message: 'Diet not found' });
        }
        const { id } = diet

        res.status(200).json({ id });
    } catch (error) {
        console.error('Error retrieving diet:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

const getDietByUser = asyncHandler(async (req, res) => {
    const user = await getUserById(req.body.id);
    const diet = await dietSchema.findOne({where: {id: user.diet_id} })

    res.status(200).json({ name: diet });
});

const getDietById = asyncHandler(async (id) => {
    const diet = await dietSchema.findOne({ where: { id } })

    return diet;
});

const getDiets = asyncHandler(async (req, res) => {
    const diets = await dietSchema.findAll()

    res.status(200).json({ diets })
})

const postDiets = asyncHandler(async (req, res) => {
    const { name, calories } = req.body;

    const diet = await dietSchema.create({
        name, calories
    });
    res.status(200).json({ data: diet });
});

const patchDiet = asyncHandler(async (req, res) => {
    const { name, calories, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Missing 'id' in the request body" });
    }

    const updateData = {
        name, calories
    };

    const [rowsUpdated] = await dietSchema.update(updateData, {
        where: { id },
    });

    if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Diet not found" });
    }

    const updatedDiet = await dietSchema.findByPk(id);
    res.status(200).json({ data: updatedDiet });
});

const deleteDiet = asyncHandler(async (req, res) => {
    const diet = await dietSchema.findByPk(req.params.id);

    if (!diet) {
        res.status(500).send({ message: "No diet found" })
    }

    await dietSchema.destroy({ where: { id: diet.id } });

    res.status(200).json({ data: {} })
})

module.exports = { getDiet, getDietByUser, getDietById, getDiets, postDiets, patchDiet, deleteDiet }