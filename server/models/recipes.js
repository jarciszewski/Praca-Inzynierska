const { sequelize, Sequelize } = require("../db")

const recipeSchema = sequelize.define("Recipes", {
    dish_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Dishes',
            key: 'id'
        }
    },
    ingredients_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Ingredients',
            key: 'id'
        }
    }
}, {
    timestamps: false
})

recipeSchema.removeAttribute('id');

module.exports = { recipeSchema }