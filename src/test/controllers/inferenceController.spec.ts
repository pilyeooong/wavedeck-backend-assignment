import { Application } from 'express';
import createApp from 'app';
import request from 'supertest';
import sequelize from 'database';
import userFactory from 'test/factory/userFactory';
import fileFactory from 'test/factory/fileFactory';
import voiceFactory from 'test/factory/voiceFactory';

import queue, { redisConnection } from 'jobs/queue';

describe('inferenceController', () => {
  let app: Application;

  beforeAll(async () => {
    jest.setTimeout(20000);
    await sequelize.sync({ force: true, logging: false });
    app = await createApp();
  });

  afterAll(async () => {
    await queue.close();
    await redisConnection.quit();
  });

  it('request sts', async () => {
    const user = await userFactory();
    const file = await fileFactory();
    const voice = await voiceFactory();

    const res = await request(app)
      .post('/api/v1/inference/sts')
      .send({ userId: user.id, fileId: file.id, voiceId: voice.id, pitch: 10 });

    const {
      data: { id: fileId },
    } = res.body;

    expect(res.statusCode).toBe(200);
    expect(fileId).not.toBeNull();
  });
});
