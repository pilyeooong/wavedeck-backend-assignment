import { Application } from 'express';
import createApp from 'app';
import request from 'supertest';
import sequelize from 'database';

import queue, { redisConnection } from 'jobs/queue';

describe('adminController', () => {
  let app: Application;

  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });
    app = await createApp();
  });

  afterAll(async () => {
    await queue.close();
    await redisConnection.quit();
  });

  it('should return queue status', async () => {
    const res = await request(app).get('/admin/queues/status');

    const { data } = res.body;

    expect(res.statusCode).toBe(200);
    expect(data).not.toBeNull();
  });
});
