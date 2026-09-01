/**
 * App lifecycle helpers for optimizing test startup and execution speed
 */

const { by, device, element, waitFor } = require('detox');

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
  // Restart the app so JS state, native views, event listeners and focus are
  // recreated for every test. A React Native reload does not isolate all
  // native state and became unreliable with the RN 0.87 migration.
  await launchAppOptimized({ newInstance: true });

  await waitFor(element(by.id('root')))
    .toBeVisible()
    .withTimeout(10000);
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








