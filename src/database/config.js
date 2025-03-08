const dotenv = require('dotenv');

dotenv.config();

const host = process.env.DATABASE_HOST || 'localhost';
const port = parseInt(process.env.DATABASE_PORT || '3306', 10);
const username = process.env.DATABASE_USER || 'test';
const password = process.env.DATABASE_PASSWORD || '1234';
const database = process.env.DATABASE_NAME || 'wavedeck-development';
const dialect = 'mysql';

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    port,
  },
  test: {
    username,
    password,
    database,
    host,
    dialect,
    port,
  },
  production: {
    username,
    password,
    database,
    host,
    dialect,
    port,
  },
};
