export const USER_NOT_EXISTS_MESSAGE = '유저가 존재하지 않습니다.';
export const BAD_REQUEST_ERROR_MESSAGE = '유효하지 않은 요청입니다.';
export const FILE_NOT_EXISTS_MESSAGE = '파일이 존재하지 않습니다.';
export const FILE_SIZE_OVER_LIMIT_MESSAGE = '10MB 이하의 파일만 업로드 가능합니다.';
export const FILE_SHOULD_BE_UPLOAD_MESSAGE = '파일이 업로드 되지 않았습니다.';
export const INVALID_AUDIO_FILE_MESSAGE = '유효한 오디오 파일이 아닙니다.';

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}
