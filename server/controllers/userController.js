const { userSchema, validate } = require('../models/users')
const bcrypt = require("bcrypt")
const asyncHandler = require('express-async-handler')

const getUser = asyncHandler(async (req, res) => {
    const user = await userSchema.findByPk(req.params.id)

    res.status(200).json({ data: user })
})

const getUserById = asyncHandler(async (id) => {
    return await userSchema.findOne({ where: { id } });
});

const postUser = asyncHandler (async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const userExists = await userSchema.findOne({ where: { email: req.body.email } });
        if (userExists)
            return res.status(409).send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await userSchema.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            login: req.body.login,
            password: hashPassword,
            diet_id: req.body.diet_id
        });

        res.status(201).send({ message: "User created successfully", data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const patchUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, password, diet_id, id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Missing 'id' in the request body" });
    }
    
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    const updateData = { firstName, lastName, password: hashPassword, diet_id };

    try {
        const [rowsUpdated] = await userSchema.update(updateData, {
            where: { id },
        });

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = await userSchema.findByPk(id);
        res.status(200).json({ data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await userSchema.findByPk(req.params.id);

    if (!user) {
        res.status(500).send({ message: "User not found" })
    }

    await userSchema.destroy({ where: { id: user.id } });

    res.status(200).json({ data: {} })
})

module.exports = { getUser, getUserById, postUser, patchUser, deleteUser }