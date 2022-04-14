/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: 1, // workaround to improve test speed: https://github.com/kulshekhar/ts-jest/issues/259#issuecomment-769774111
};
