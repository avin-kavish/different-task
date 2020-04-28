module.exports = {
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/cypress/**',
    '!**/fixtures/**',
  ],
  setupFilesAfterEnv: ['./setupTests.ts'],
  testEnvironment: 'enzyme',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/cypress/',
    '/fixtures/',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // "^.+\\.(jsx?|tsx?)$": "<rootDir>/node_modules/babel-jest",
    // "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  // moduleNameMapper: {
  //   '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  // },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json',
    },
  },
}
