import { parseFile } from 'music-metadata';

export const extractFileMetadata = async (file: Express.Multer.File) => {
  const { mimetype, filename, path: filePath, size } = file;

  const metadataObj = {
    fileType: mimetype,
    fileName: filename,
    fileUrl: filePath,
    fileSize: size,
  };

  if (!isAudioFile(mimetype)) {
    return metadataObj;
  }

  const audioMetadata = await parseFile(filePath);

  return {
    ...metadataObj,
    duration: audioMetadata.format.duration || 0,
  };
};

export const isAudioFile = (mimetype: string) => {
  if (mimetype.startsWith('audio/')) {
    return true;
  }
  return false;
};

export const isFileSizeOverLimit = (fileSize: number, maxSizeMB = 10) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // 10MB
  if (fileSize > maxSizeBytes) {
    return true;
  }
  return false;
};
