'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true
        },
        login: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING(70),
          allowNull: false
        },
        diet_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 1,
          references: {
            model: 'Diets',
            key: 'id'
          }
        },
        role: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: false,
          defaultValue: 'user'
        }
      })
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("Users");
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
