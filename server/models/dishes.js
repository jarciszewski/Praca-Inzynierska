const { sequelize, Sequelize } = require("../db")

const dishesSchema = sequelize.define("Dishes", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    meal_time: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    macronutrients_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Dishes',
            key: 'id'
        }
    }
}, {
    timestamps: false
})

module.exports = { dishesSchema }