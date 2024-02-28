const { sequelize, Sequelize } = require("../db")

const macronutrientsSchema = sequelize.define("Macronutrients", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fats: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    carbohydrates: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    proteins: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    glycemic_index: {
        type: Sequelize.INTEGER,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = { macronutrientsSchema }