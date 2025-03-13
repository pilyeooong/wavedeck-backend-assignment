import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || '6379';

export const redisConnection = new Redis({
  host: host,
  port: +port,
  maxRetriesPerRequest: null,
});

export const INFERENCE_QUEUE = 'INFERENCE_QUEUE';

export const queue = new Queue(INFERENCE_QUEUE, { connection: redisConnection });
