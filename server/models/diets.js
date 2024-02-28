const { sequelize, Sequelize } = require("../db")

const dietSchema = sequelize.define("Diets", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = { dietSchema }