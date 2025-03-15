'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test1@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          email: 'test2@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          email: 'test3@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
