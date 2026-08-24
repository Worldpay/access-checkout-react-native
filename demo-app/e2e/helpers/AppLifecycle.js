/**
 * App lifecycle helpers for optimizing test startup and execution speed
 */

const { device } = require('detox');
const { sleep } = require('./TestHelpers');

/**
 * Launches app with optimized settings for test speed
 * @param {object} options - Launch options
 * @returns {Promise<void>}
 */
async function launchAppOptimized(options = {}) {
  const defaultOptions = {
    // Reuse existing app instance when possible
    newInstance: false,
    // Don't delete and reinstall the app
    delete: false,
    // Launch arguments to speed up app and handle network properly
    launchArgs: {
      detoxPrintBusyIdleResources: 'NO',
    },
    ...options
  };

  await device.launchApp(defaultOptions);
}

/**
 * Resets app to clean state by reloading React Native bundle
 * This properly clears all state including form inputs
 * @returns {Promise<void>}
 */
async function resetAppState() {
  // Reload React Native to reset all state
  // This is necessary to clear form inputs between tests
  await device.reloadReactNative();

  // Increased delay to allow app initialization, especially for navigation
  // This is particularly important on Android after React Native 0.87 migration
  await sleep(500);
}

/**
 * Only reloads if the app is in a bad state
 * Use this instead of always reloading in beforeEach
 * @returns {Promise<void>}
 */
async function ensureAppIsReady() {
  try {
    // Quick check if app is responsive
    await device.pressBack(); // No-op on iOS, harmless on Android
  } catch (error) {
    // If app is unresponsive, do a full reload
    await device.reloadReactNative();
  }
}

module.exports = {
  launchAppOptimized,
  resetAppState,
  ensureAppIsReady,
};







