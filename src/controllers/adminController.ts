import { Request, Response, NextFunction } from 'express';
import queue from 'jobs/queue';
import { ResponseObject } from 'common/response';

export const getQueueStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 큐 종류가 많아질 경우 queue를 구분할 별도의 쿼리 인자를 받아 분기 처리한다.
    const waitingJobs = await queue.getWaiting();
    const activeJobs = await queue.getActive();
    const delayedJobs = await queue.getDelayed();
    const failedJobs = await queue.getFailed();
    const completedJobs = await queue.getCompleted();

    const queueStatusObj = {
      queue: queue.name,
      waitingJobs,
      activeJobs,
      delayedJobs,
      failedJobs,
      completedJobs,
    };

    const response = new ResponseObject(queueStatusObj);

    res.status(200).json(response);
  } catch (e) {
    next(e); // 글로벌 에러 핸들러로 전달
  }
};
