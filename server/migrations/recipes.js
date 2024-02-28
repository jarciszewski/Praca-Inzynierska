'use strict';

const { Model, HasMany } = require('sequelize');
const recipe = require('../models/recipes');
const ingredients = require('../models/ingredients');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Recipes', {
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
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("Recipes");
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};