'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pitch: {
        type: Sequelize.FLOAT,
      },
      transactionId: {
        type: Sequelize.STRING,
        unique: true,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      voiceId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'voices',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      fileId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex('jobHistories', ['deletedAt'], {
      name: 'jobHistories_deletedAt_index',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobHistories');
  },
};
