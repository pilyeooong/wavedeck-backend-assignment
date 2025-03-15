import JobHistory from 'models/jobHistory';
import { randomUUID } from 'crypto';

describe('jobHistory', () => {
  it('should create jobHistory', async () => {
    const transactionId = randomUUID();
    const pitch = 10;
    const userId = 10;
    const fileId = 10;
    const voiceId = 10;

    jest.spyOn(JobHistory, 'create').mockResolvedValue({ id: 1 } as unknown as JobHistory);

    const jobHistory = await JobHistory.createJobHistory({
      transactionId,
      pitch,
      userId,
      fileId,
      voiceId,
    });

    expect(jobHistory).not.toBeNull();
    expect(jobHistory.id).toEqual(1);
  });

  it('should find jobHistory by id', async () => {
    const id = 1;

    jest.spyOn(JobHistory, 'findOne').mockResolvedValue({ id } as JobHistory);

    const jobHistory = await JobHistory.findById(id);

    expect(jobHistory).not.toBeNull();
    expect(jobHistory?.id).toEqual(id);
  });
});
