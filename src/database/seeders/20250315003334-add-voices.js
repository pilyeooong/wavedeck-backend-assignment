'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'voices',
      [
        {
          name: 'test voice1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'test voice2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'test voice3',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('voices', null, {});
  },
};
