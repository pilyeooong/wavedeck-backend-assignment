import Voice from 'models/voice';

describe('voice', () => {
  it('should create voice', async () => {
    const name = 'test voice';

    jest.spyOn(Voice, 'create').mockResolvedValue({ id: 1, name } as unknown as Voice);

    const voice = await Voice.createVoice({ name });

    expect(voice).not.toBeNull();
    expect(voice.id).toEqual(1);
  });

  it('should find voice by id', async () => {
    const id = 1;

    jest.spyOn(Voice, 'findOne').mockResolvedValue({ id } as Voice);

    const voice = await Voice.findById(id);

    expect(voice).not.toBeNull();
    expect(voice?.id).toEqual(id);
  });
});
