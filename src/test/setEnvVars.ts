process.env.DATABASE_HOST = 'localhost';
process.env.DATABASE_NAME = 'wavedeck-test';
process.env.DATABASE_PORT = '3307';
process.env.PORT = '3000';
process.env.NODE_ENV = 'test';
process.env.REDIS_HOST = process.env.CI ? 'redis' : 'localhost';
process.env.REDIS_PORT = '6379';
