// eslint-disable-next-line no-undef
module.exports = {
  collectCoverage: true,
  coverageDirectory: './reports/coverage/',
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testRegex: '/test/.*.spec\\.ts(x)?',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './reports/tests/unit/index.html',
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: './reports/tests/unit',
      },
    ],
  ],
};
