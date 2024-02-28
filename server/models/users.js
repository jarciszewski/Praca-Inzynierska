const { sequelize, Sequelize } = require("../db")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = sequelize.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
    },
    login: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(70),
        allowNull: false
    },
    diet_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
        references: {
            model: 'Diets',
            key: 'id'
        }
    },
    role: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: false,
        defaultValue: 'user'
    }
}, {
    timestamps: false
})

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        login: Joi.string().required().label("Login"),
        password: passwordComplexity().required().label("Password"),
        repeat_password: Joi.string().valid(Joi.ref('password')).required().label("Repeat Password").messages({
            'any.only': 'Passwords must be the same',
        }),
        diet_id: Joi.number().integer()
    })
    return schema.validate(data)
}

module.exports = { userSchema, validate }