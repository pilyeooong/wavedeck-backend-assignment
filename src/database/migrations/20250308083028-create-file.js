'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      previewUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fileName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fileType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fileSize: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      fileUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.FLOAT,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      },
      originalFileId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.addIndex('files', ['deletedAt'], {
      name: 'files_deletedAt_index',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files');
  },
};
