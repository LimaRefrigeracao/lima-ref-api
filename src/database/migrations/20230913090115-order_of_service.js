'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("order_of_service", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        initialValue: 1000,
        type: Sequelize.INTEGER,
      },
      cod_order: {
        llowNull: false,
        type: Sequelize.INTEGER,
      },
      estimate: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      value: {
        allowNull: true,
        type: Sequelize.DECIMAL,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("order_of_service");
  }
};
