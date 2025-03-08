export const BAD_REQUEST_ERROR_MESSAGE = '유효하지 않은 요청입니다.';

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
