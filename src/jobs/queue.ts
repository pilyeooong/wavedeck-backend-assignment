import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const host = process.env.REDIS_HOST || 'redis';
const port = process.env.REDIS_PORT || '6379';

export const redisConnection = new Redis({
  host,
  port: +port,
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
});

export const INFERENCE_QUEUE = 'INFERENCE_QUEUE';

const queue = new Queue(INFERENCE_QUEUE, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

export default queue;
