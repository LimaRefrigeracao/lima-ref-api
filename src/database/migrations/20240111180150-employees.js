'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cpf: {
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{11}$/i,
        },
        type: Sequelize.BIGINT
      },
      entry_date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      payment_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      payment_value: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      total_salary: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      pix_key: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      vouchers: {
        allowNull: true,
        type: Sequelize.TEXT
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};
