import { Worker } from 'bullmq';
import { INFERENCE_QUEUE, redisConnection } from 'jobs/queue';
import requestAiInferenceJob from 'jobs/requestAiInferenceJob';

const WORKER_CONCURRENCY = process.env.WORKER_CONCURRENCY || 3;

const worker = new Worker(INFERENCE_QUEUE, async (job) => requestAiInferenceJob(job), {
  connection: redisConnection,
  concurrency: +WORKER_CONCURRENCY,
});

console.log('Worker running properly');

export default worker;
