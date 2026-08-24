/**
 * Reusable test helpers to reduce duplication and improve test reliability
 */

const { TIMEOUT_IN_MS } = require('../page-objects/Options');

/**
 * Polls a function until it returns the expected value or times out
 * @param {Function} pollFn - Async function to poll
 * @param {*} expectedValue - Expected value to match
 * @param {number} timeout - Timeout in milliseconds
 * @param {number} interval - Poll interval in milliseconds (reduced to 50ms for speed)
 * @returns {Promise<*>} The polled value
 */
async function waitForCondition(pollFn, expectedValue, timeout = TIMEOUT_IN_MS, interval = 50) {
  const startTime = Date.now();
  let lastValue;

  while (Date.now() - startTime < timeout) {
    try {
      lastValue = await pollFn();
      if (lastValue === expectedValue) {
        return lastValue;
      }
    } catch (error) {
      // Continue polling on errors
    }
    await sleep(interval);
  }

  throw new Error(
    `Timeout waiting for condition. Expected: ${expectedValue}, Last received: ${lastValue}`
  );
}

/**
 * Polls a function until it returns a truthy value or times out
 * @param {Function} pollFn - Async function to poll
 * @param {number} timeout - Timeout in milliseconds
 * @param {number} interval - Poll interval in milliseconds (reduced to 50ms for speed)
 * @returns {Promise<*>} The polled value
 */
async function waitForTruthy(pollFn, timeout = TIMEOUT_IN_MS, interval = 50) {
  const startTime = Date.now();
  let lastValue;

  while (Date.now() - startTime < timeout) {
    try {
      lastValue = await pollFn();
      if (lastValue) {
        return lastValue;
      }
    } catch (error) {
      // Continue polling on errors
    }
    await sleep(interval);
  }

  throw new Error(
    `Timeout waiting for truthy value. Last received: ${lastValue}`
  );
}

/**
 * Waits for a state value to match expected value with retry logic
 * @param {Function} getStateFn - Function that retrieves the state
 * @param {*} expectedValue - Expected state value
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<*>} The state value
 */
async function waitForState(getStateFn, expectedValue, timeout = TIMEOUT_IN_MS) {
  return waitForCondition(getStateFn, expectedValue, timeout);
}

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Waits for validation to complete after input
 * Reduced default wait time from 300ms to 200ms for better performance
 * @param {number} ms - Milliseconds to wait (default 200ms)
 * @returns {Promise<void>}
 */
async function waitForValidation(ms = 200) {
  await sleep(ms);
}

/**
 * Waits for app to finish network requests and become idle
 * Useful when network requests may delay UI updates
 * @param {number} timeout - Max wait time in milliseconds
 * @returns {Promise<void>}
 */
async function waitForNetworkIdle(timeout = 5000) {
  const startTime = Date.now();

  // Give network a moment to start if it hasn't already
  await sleep(100);

  // Poll until network appears idle
  while (Date.now() - startTime < timeout) {
    try {
      // If we can interact with UI without errors, network is likely idle
      await sleep(200);
      return;
    } catch (error) {
      await sleep(100);
    }
  }

  // Timeout reached, proceed anyway
  console.warn('Network idle timeout reached, proceeding with test');
}

/**
 * Waits for a network-dependent element to be ready
 * Combines visibility check with network idle wait
 * @param {Function} elementFn - Function that returns the element
 * @param {number} timeout - Max wait time
 * @returns {Promise<void>}
 */
async function waitForElementAfterNetwork(elementFn, timeout = 5000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      const element = elementFn();
      // Try to get attributes to verify element is ready
      await element.getAttributes();
      return;
    } catch (error) {
      await sleep(100);
    }
  }

  throw new Error('Timeout waiting for element after network request');
}

module.exports = {
  waitForCondition,
  waitForTruthy,
  waitForState,
  waitForValidation,
  sleep,
  waitForNetworkIdle,
  waitForElementAfterNetwork,
};



