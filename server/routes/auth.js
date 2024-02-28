const router = require("express").Router()
const { userSchema } = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const Joi = require("joi")

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message })
    const user = await userSchema.findOne({ where: { login: req.body.login } })

    if (!user)
        return res.status(401).send({ message: "Invalid login or password" })
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if (!validPassword)
        return res.status(401).send({ message: "Invalid login or password" })
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' })

    res.status(200).send({ data: { token }, message: "logged in successfully" })
})

const validate = (data) => {
    const schema = Joi.object({
        login: Joi.string().required().label("Login"),
        password: Joi.string().required().label("Password"),
    })
    return schema.validate(data)
}

router.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if (decoded && decoded.role) {
            return res.status(200).json({ role: decoded.role });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Not an admin.' });
    }
};

router.get("/verify", verifyToken, (req, res) => {
    res.send(req.user)
})

router.get("/admin", verifyToken, isAdmin, (req, res) => {
    res.send("Admin");
});

module.exports = router