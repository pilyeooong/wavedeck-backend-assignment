import path from 'path';
import { Sequelize } from 'sequelize-typescript';

const host = process.env.DATABASE_HOST || 'localhost';
const port = parseInt(process.env.DATABASE_PORT || '3306', 10);
const username = process.env.DATABASE_USER || 'test';
const password = process.env.DATABASE_PASSWORD || '1234';
const database = process.env.DATABASE_NAME || 'wavedeck-development';
const dialect = 'mysql';

const isProduction = process.env.NODE_ENV === 'production';

const modelsPath = isProduction
  ? path.resolve('dist', 'models', '*.js')
  : path.resolve('src', 'models', '*.ts');

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  logging: false,
  models: [modelsPath],
});

export default sequelize;
