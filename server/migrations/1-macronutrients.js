'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Macronutrients', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
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
          type: Sequelize.INTEGER
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false
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
      await queryInterface.dropTable("Macronutrients");
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};