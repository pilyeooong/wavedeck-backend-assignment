import { Worker } from 'bullmq';
import { redisConnection } from 'jobs/queue';

new Worker('sample', async () => {}, { connection: redisConnection });

console.log('Worker running properly');
