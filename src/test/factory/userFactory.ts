import { faker } from '@faker-js/faker';
import User from 'models/user';

const userFactory = async ({ email = faker.internet.email() } = {}) => {
  return await User.createUser({ email });
};

export default userFactory;
