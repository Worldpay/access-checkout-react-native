// eslint-disable-next-line no-undef
module.exports = {
  collectCoverage: true,
  coverageDirectory: './reports/coverage/',
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  preset: 'react-native',
  testRegex: '/test/.*.spec\\.ts(x)?',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
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
