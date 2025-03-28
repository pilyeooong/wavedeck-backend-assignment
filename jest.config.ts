import { JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testRegex: '.spec.ts$',
  modulePaths: [compilerOptions.baseUrl],
  testEnvironment: 'node',
  testTimeout: 10000,
  setupFiles: ['<rootDir>/src/test/setEnvVars.ts'],
};

export default jestConfig;
