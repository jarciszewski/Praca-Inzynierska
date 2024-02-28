'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Dishes', {
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
            model: 'Macronutrients',
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
      await queryInterface.dropTable("Dishes");
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};