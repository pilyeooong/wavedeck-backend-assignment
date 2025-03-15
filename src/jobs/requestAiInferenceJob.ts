import { Job } from 'bullmq';
import { requestAiInference } from 'external/aiInference';

const requestAiInferenceJob = async (job: Job) => {
  const {
    data: { transactionId, fileId, voiceId, pitch },
  } = job;

  // AI 서버에 변환 요청
  const response = requestAiInference({ transactionId, fileId, voiceId, pitch });

  return response;
};

export default requestAiInferenceJob;
