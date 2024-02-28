'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Diet_has_dishes', {
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
          references: {
            model: 'Dishes',
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
      await queryInterface.dropTable("Diet_has_dishes");
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};