"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      product: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      client: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      telephone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      adress: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      payment_status: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      order_of_service: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      warehouse_status: {
        allowNull: true,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      observation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("services");
  },
};
