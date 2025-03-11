export const BAD_REQUEST_ERROR_MESSAGE = '유효하지 않은 요청입니다.';
export const FILE_SIZE_OVER_LIMIT_MESSAGE = '10MB 이하의 파일만 업로드 가능합니다.';
export const FILE_SHOULD_BE_UPLOAD_MESSAGE = '파일이 업로드 되지 않았습니다.';

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
