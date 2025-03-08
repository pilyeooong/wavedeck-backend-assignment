import { Application } from 'express';
import createApp from 'app';
import request from 'supertest';

describe('sample integration test', () => {
  let app: Application;

  beforeAll(async () => {
    app = await createApp();
  });

  it('health check', async () => {
    const res = await request(app).get('/');

    console.log(res);

    expect(res.statusCode).toBe(200);
  });
});
