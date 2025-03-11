import { NextFunction, Request, Response } from 'express';
import {
  BadRequestError,
  FILE_SHOULD_BE_UPLOAD_MESSAGE,
  FILE_SIZE_OVER_LIMIT_MESSAGE,
} from 'errors';
import File from 'models/file';
import { extractFileMetadata, isFileSizeOverLimit } from 'utils/fileUtil';
import { ResponseObject } from 'common/response';

export const createFile = async (req: Request, res: Response, _: NextFunction) => {
  const { userId } = req.body;
  if (!req.file) {
    throw new BadRequestError(FILE_SHOULD_BE_UPLOAD_MESSAGE);
  }

  const fileMetadata = await extractFileMetadata(req.file);
  if (isFileSizeOverLimit(fileMetadata.fileSize)) {
    throw new BadRequestError(FILE_SIZE_OVER_LIMIT_MESSAGE);
  }

  const file = await File.createFile({ userId, ...fileMetadata });

  const responseObj = new ResponseObject({
    userId,
    type: 'upload',
    fileId: file.id,
    ...fileMetadata,
  });

  res.status(200).send(responseObj);
};
