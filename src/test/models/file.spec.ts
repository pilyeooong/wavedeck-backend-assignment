import File from 'models/file';

describe('file', () => {
  it('should create file', async () => {
    const status = 'test status';
    const previewUrl = 'test previewUrl';
    const fileName = 'test fileName';
    const fileType = 'test fileType';
    const fileSize = 10;
    const fileUrl = 'test fileUrl';
    const id = 1;

    const testFileObj = { status, previewUrl, fileName, fileType, fileSize, fileUrl };
    jest.spyOn(File, 'create').mockResolvedValue({ id, ...testFileObj } as unknown as File);

    const file = await File.createFile(testFileObj);

    expect(file).not.toBeNull();
    expect(file.id).toEqual(id);
  });

  it('should find file by id', async () => {
    const id = 1;

    jest.spyOn(File, 'findOne').mockResolvedValue({ id } as File);

    const file = await File.findById(id);

    expect(file).not.toBeNull();
    expect(file?.id).toEqual(id);
  });
});
