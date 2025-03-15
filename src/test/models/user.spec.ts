import User from 'models/user';

describe('user', () => {
  it('should create user', async () => {
    const email = 'test@gmail.com';

    jest.spyOn(User, 'create').mockResolvedValue({ id: 1, email } as unknown as User);

    const user = await User.createUser({ email });

    expect(user).not.toBeNull();
    expect(user.id).toEqual(1);
  });

  it('should find user by id', async () => {
    const id = 1;

    jest.spyOn(User, 'findOne').mockResolvedValue({ id } as User);

    const user = await User.findById(id);

    expect(user).not.toBeNull();
    expect(user?.id).toEqual(id);
  });
});
