import { Application } from 'express';
import createApp from 'app';
import request from 'supertest';
import sequelize from 'database';
import path from 'path';
import userFactory from 'test/factory/userFactory';
import fileFactory from 'test/factory/fileFactory';

describe('commonController', () => {
  let app: Application;

  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });

    app = await createApp();
  });

  it('create audio file', async () => {
    const sampleAudioPath = path.resolve(__dirname, '../sample', 'sample.mp3');
    const user = await userFactory();

    const res = await request(app)
      .post('/api/v1/common/upload/audio')
      .field('userId', user.id)
      .attach('file', sampleAudioPath);

    const {
      data: { id: fileId },
    } = res.body;

    expect(res.statusCode).toBe(200);
    expect(fileId).not.toBeNull();
  });

  it('destroy audio file', async () => {
    const user = await userFactory();
    const file = await fileFactory({ userId: user.id });

    const res = await request(app)
      .delete(`/api/v1/common/upload/audio/${file.id}`)
      .send({ userId: user.id });

    const {
      data: { id: fileId, deletedAt },
    } = res.body;

    expect(res.statusCode).toBe(200);
    expect(fileId).not.toBeNull();
    expect(deletedAt).not.toBeNull();
  });
});
