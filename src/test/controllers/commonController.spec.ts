import { Application } from 'express';
import createApp from 'app';
import request from 'supertest';
import User from 'models/user';
import sequelize from 'database';

describe('commonController', () => {
  let app: Application;

  beforeAll(async () => {
    app = await createApp();

    await sequelize.sync({ force: true });
  });

  it('health check', async () => {
    const res = await request(app).get('/');

    console.log(await User.findAll());

    expect(res.statusCode).toBe(200);
  });
});
