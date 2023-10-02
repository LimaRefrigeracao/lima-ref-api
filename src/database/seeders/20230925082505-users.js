"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: process.env.SEEDER_ADMIN_USERNAME,
          email: process.env.SEEDER_ADMIN_EMAIL,
          password: process.env.SEEDER_ADMIN_PASSWORD,
          admin: process.env.SEEDER_ADMIN_PERMISSION,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
