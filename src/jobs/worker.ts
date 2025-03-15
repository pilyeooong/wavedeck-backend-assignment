import { Worker } from 'bullmq';
import { INFERENCE_QUEUE, redisConnection } from 'jobs/queue';
import requestAiInferenceJob from 'jobs/requestAiInferenceJob';

const worker = new Worker(INFERENCE_QUEUE, async (job) => requestAiInferenceJob(job), {
  connection: redisConnection,
  concurrency: 5,
});

console.log('Worker running properly');

export default worker;
