export type AiInferenceResponseType = {
  originalFileId: number;
  voiceId: number;
  pitch: number;
  soundQuality: number;
  fileSize: number;
  duration: number;
  originalPath: string;
  convertedPath: string;
  fileType: string;
  fileName: string;
  previewUrl: string;
};

export const requestAiInference = ({
  fileId,
  voiceId,
  pitch,
}: {
  fileId: number;
  voiceId: number;
  pitch: number;
}): AiInferenceResponseType => {
  const aiResponse = {
    originalFileId: fileId,
    voiceId,
    pitch,
    soundQuality: 24,
    fileSize: 100000,
    duration: 10000,
    originalPath: '/original/test',
    convertedPath: '/converted/test',
    fileType: 'audio/mpeg',
    fileName: 'test-converted.mp4',
    previewUrl: `preview/test-converted.mp4`,
  };

  return aiResponse;
};
