/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
  },
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
