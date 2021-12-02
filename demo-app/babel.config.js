const path = require('path');
const sdkPackageJson = require('../access-checkout-react-native-sdk/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [sdkPackageJson.name]: path.join(__dirname, '..', sdkPackageJson.source),
        },
      },
    ],
  ],
};
