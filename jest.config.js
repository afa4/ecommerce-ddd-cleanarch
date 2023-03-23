/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  modulePaths: ['<rootDir>/src/'],
  testEnvironment: 'jest-environment-node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.build/'],
};
