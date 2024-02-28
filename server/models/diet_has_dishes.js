const { sequelize, Sequelize } = require("../db")
const { dishesSchema } = require("./dishes")

const diet_has_dishesSchema = sequelize.define("Diet_has_dishes", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    diet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Diets',
            key: 'id'
        }
    },
    dish_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'Dishes',
            key: 'id'
        }
    }
}, {
    timestamps: false
})

module.exports = { diet_has_dishesSchema }