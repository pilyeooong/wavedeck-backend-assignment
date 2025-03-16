import { Worker } from 'bullmq';
import { INFERENCE_QUEUE, redisConnection } from 'jobs/queue';
import requestAiInferenceJob from 'jobs/requestAiInferenceJob';
import { JOB_TIMEOUT_ERROR_MESSAGE, OperationError } from 'errors';

const WORKER_CONCURRENCY = process.env.WORKER_CONCURRENCY || 3;

const rejectTimer = async (duration: number) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new OperationError(JOB_TIMEOUT_ERROR_MESSAGE)), duration),
  );

const worker = new Worker(
  INFERENCE_QUEUE,
  async (job) => {
    const task = async () => {
      return await requestAiInferenceJob(job);
    };
    return await Promise.race([task(), rejectTimer(10000)]);
  },
  {
    connection: redisConnection,
    concurrency: +WORKER_CONCURRENCY,
  },
);

console.log('Worker running properly');

export default worker;
