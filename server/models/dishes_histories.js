const { sequelize, Sequelize } = require("../db");

const dishes_historiesSchema = sequelize.define("Dishes_histories", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  dish_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Dishes',
      key: 'id'
    }
  },
  diet_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Diets',
      key: 'id'
    }
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false
  }
}, {
  timestamps: false
});

module.exports = { dishes_historiesSchema };