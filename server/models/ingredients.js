const { sequelize, Sequelize } = require("../db")

const ingredientsSchema = sequelize.define("Ingredients", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    macronutrients_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Macronutrients',
            key: 'id'
        }
    }
}, {
    timestamps: false
})

module.exports = { ingredientsSchema }