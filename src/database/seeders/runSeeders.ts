import { QueryInterface } from 'sequelize';
import sequelize from 'database/index';
import { faker } from '@faker-js/faker';

const runSeeders = async () => {
  try {
    const queryInterface: QueryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('users', [
      {
        email: `${faker.internet.email()}@gmail.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        email: `${faker.internet.email()}@gmail.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        email: `${faker.internet.email()}@gmail.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);

    await queryInterface.bulkInsert('voices', [
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
    ]);

    console.log('seed done');
  } catch (e) {
    console.error('seed fail', e);
    throw e;
  }
};

export default runSeeders;
