import { faker } from '@faker-js/faker';
import Voice from 'models/voice';

const voiceFactory = async ({ name = faker.animal.dog() } = {}) => {
  return await Voice.createVoice({ name });
};

export default voiceFactory;
