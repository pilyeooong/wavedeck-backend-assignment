import File, { FILE_STATUS_ORIGINAL } from 'models/file';

const fileFactory = async ({
  fileType = 'audio/mpeg',
  fileName = 'sample.mp3',
  fileUrl = 'uploads/sample.mp3',
  fileSize = 80000,
  duration = 10,
  status = FILE_STATUS_ORIGINAL,
  previewUrl = 'preview/sample.mp3',
  userId = 1,
} = {}) => {
  return await File.createFile({
    fileType,
    fileName,
    fileUrl,
    fileSize,
    duration,
    status,
    previewUrl,
    userId,
  });
};

export default fileFactory;
