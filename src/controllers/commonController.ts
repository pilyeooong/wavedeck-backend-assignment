import { NextFunction, Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  BAD_REQUEST_ERROR_MESSAGE,
  FILE_NOT_EXISTS_MESSAGE,
  FILE_SHOULD_BE_UPLOAD_MESSAGE,
  FILE_SIZE_OVER_LIMIT_MESSAGE,
  INVALID_AUDIO_FILE_MESSAGE,
  USER_NOT_EXISTS_MESSAGE,
  FORBIDDEN_MESSAGE,
  ForBiddenError,
} from 'errors';
import File, { FILE_STATUS_ORIGINAL } from 'models/file';
import { extractFileMetadata, isAudioFile, isFileSizeOverLimit } from 'utils/fileUtil';
import { ResponseObject } from 'common/response';
import sequelize from 'database';
import User from 'models/user';

export const createAudioFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    if (!req.file) {
      throw new BadRequestError(FILE_SHOULD_BE_UPLOAD_MESSAGE);
    }

    if (userId) {
      const user = await User.findOne(userId);
      if (!user) {
        throw new NotFoundError(USER_NOT_EXISTS_MESSAGE);
      }
    }

    if (!isAudioFile(req.file.mimetype)) {
      throw new BadRequestError(INVALID_AUDIO_FILE_MESSAGE);
    }

    const fileMetadata = await extractFileMetadata(req.file);
    if (isFileSizeOverLimit(fileMetadata.fileSize)) {
      throw new BadRequestError(FILE_SIZE_OVER_LIMIT_MESSAGE);
    }

    const file = await File.createFile({
      userId,
      ...fileMetadata,
      status: FILE_STATUS_ORIGINAL,
      previewUrl: `preview/${fileMetadata.fileName}`,
    });

    const responseObj = new ResponseObject(file);

    res.status(200).send(responseObj);
  } catch (e) {
    next(e);
  }
};

export const destroyAudioFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId } = req.params;
    const { userId } = req.body;
    if (!fileId) {
      throw new BadRequestError(BAD_REQUEST_ERROR_MESSAGE);
    }

    const file = await File.findById(+fileId);
    if (!file) {
      throw new NotFoundError(FILE_NOT_EXISTS_MESSAGE);
    }

    if (file.userId !== +userId) {
      throw new ForBiddenError(FORBIDDEN_MESSAGE);
    }

    const t = await sequelize.transaction();

    try {
      // 트랜잭션을 통해 레코드 삭제와 디스크 내 파일 삭제가 원자적으로 실행되도록 보장합니다.
      await file.destroy({ transaction: t });
      file.destroyLocalFile();

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }

    const responseObj = new ResponseObject(file);

    res.status(200).send(responseObj);
  } catch (e) {
    next(e);
  }
};
