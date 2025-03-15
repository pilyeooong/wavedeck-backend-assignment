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
  transactionId: string;
  fileId: number;
  voiceId: number;
  pitch: number;
}): AiInferenceResponseType => {
  // AI 서버로 sts 변환 요청을 합니다.
  // 상세 구현은 진행하지 않고 모킹데이터를 반환합니다.
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
