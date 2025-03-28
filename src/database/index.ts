import { Sequelize } from 'sequelize-typescript';
import File from 'models/file';
import User from 'models/user';
import Voice from 'models/voice';
import JobHistory from 'models/jobHistory';

const host = process.env.DATABASE_HOST || 'localhost';
const port = parseInt(process.env.DATABASE_PORT || '3306', 10);
const username = process.env.DATABASE_USER || 'test';
const password = process.env.DATABASE_PASSWORD || '1234';
const database = process.env.DATABASE_NAME || 'wavedeck-development';
const dialect = 'mysql';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  logging: false,
  models: [User, File, Voice, JobHistory],
});

export default sequelize;
