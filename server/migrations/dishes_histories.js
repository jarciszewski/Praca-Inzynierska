'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Dishes_histories', {
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
      await queryInterface.dropTable("Dishes_histories");
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};