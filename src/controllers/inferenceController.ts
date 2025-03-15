import { NextFunction, Request, Response } from 'express';
import queue, { redisConnection } from 'jobs/queue';
import { QueueEvents } from 'bullmq';
import { ResponseObject } from 'common/response';
import File, { FILE_STATUS_CONVERTED } from 'models/file';
import { BadRequestError, FILE_NOT_EXISTS_MESSAGE, OperationError } from 'errors';
import JobHistory from 'models/jobHistory';
import { AiInferenceResponseType } from 'external/aiInference';

export const requestSts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, fileId, voiceId, pitch } = req.body;

    const originalFile = await File.findById(fileId);
    if (!originalFile) {
      throw new BadRequestError(FILE_NOT_EXISTS_MESSAGE);
    }

    // 잡 수행 이전 히스토리 저장
    await JobHistory.createJobHistory({
      transactionId: req.transactionId,
      userId,
      pitch,
      fileId,
      voiceId,
    });

    // 별도 워커 프로세스에서 실행
    const job = await queue.add('inferenceSts', {
      transactionId: req.transactionId,
      fileId,
      voiceId,
      pitch,
    });

    // 사용자에게 처리 결과를 반환하기 위해 job 수행 결과를 기다린 후 결과 반환
    const queueEvents = new QueueEvents(queue.name, { connection: redisConnection });
    const aiInferenceResult: AiInferenceResponseType = await job
      .waitUntilFinished(queueEvents)
      .catch((e) => {
        throw new OperationError(e.message);
      });

    // 변환된 파일정보도 디비에 저장
    const convertedFile = await File.createFile({
      userId,
      status: FILE_STATUS_CONVERTED,
      originalFileId: fileId,
      fileUrl: aiInferenceResult.convertedPath,
      fileName: aiInferenceResult.fileName,
      fileType: aiInferenceResult.fileType,
      fileSize: aiInferenceResult.fileSize,
      previewUrl: aiInferenceResult.previewUrl,
      duration: aiInferenceResult.duration,
    });

    const response = new ResponseObject(convertedFile);

    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
};
