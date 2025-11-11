const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const blacklist = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');
const sdkPackageJson = require('../access-checkout-react-native-sdk/package.json');

const rootPath = path.resolve(__dirname, '..');
const sdkNodeModulesPath = path.join(__dirname, '../access-checkout-react-native-sdk/node_modules');
const demoAppNodeModulesPath = path.join(__dirname, 'node_modules');

const modules = Object.keys({
  ...sdkPackageJson.peerDependencies,
});

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [rootPath],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we blacklist them at the root, and alias them to the versions in example's node_modules
  resolver: {
    blacklistRE: blacklist(
      modules.map(
        (moduleName) => {
          const modulePath = path.join(sdkNodeModulesPath, moduleName);
          return new RegExp(`^${escape(modulePath)}\\/.*$`)
        }
      )
    ),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(demoAppNodeModulesPath, name);
      return acc;
    }, {}),
  },
};


module.exports = mergeConfig(getDefaultConfig(__dirname), config);
