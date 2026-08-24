/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect } = require('detox');
const { expect: jestExpect } = require('expect');
const { sessionRegEx } = require('./helpers/RegularExpressions');
const { CvcOnlyFlowPO } = require('./page-objects/CvcOnlyFlowPO');
const { CvcOnlyFlowStatesPO } = require('./page-objects/CvcOnlyFlowStatesPO');
const { launchAppOptimized, resetAppState } = require('./helpers/AppLifecycle');
/* eslint-enable @typescript-eslint/no-var-requires */

describe('CVC only flow', () => {
  const view = new CvcOnlyFlowPO();
  const cvc = view.cvc;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;
  const states = new CvcOnlyFlowStatesPO();

  beforeAll(async () => {
    // Use optimized launch with app reuse
    await launchAppOptimized();
  });

  beforeEach(async () => {
    // Fast reset instead of full reload
    await resetAppState();
    // Wait for navigation to ensure app is fully initialized
    await view.selectCvcOnlyFlow();
    // Wait for the CVC input to be visible to ensure view registration is complete
    await expect(cvc.component()).toBeVisible();
  });

  describe('by default', () => {
    it('should display a cvc form & a submit button', async () => {
      await expect(cvc.component()).toBeVisible();
      await expect(submitButton.component()).toBeVisible();
    });

    it('should not display the e2e states information', async () => {
      await expect(states.component()).toExist();
      await expect(states.component()).not.toBeVisible();
    });

    it('submit button should be disabled', async () => {
      jestExpect(await states.submitButtonEnabled()).toBe(false);
    });

    it('the cvc should be undefined', async () => {
      //Undefined is to support the silver untouched state
      jestExpect(await states.cvcIsValid()).toBe(undefined);
    });
  });

  describe('when user enters invalid cvc details', () => {
    beforeEach(async () => {
      await cvc.type('12', '12');
    });

    it('submit button should be disabled', async () => {
      jestExpect(await states.submitButtonEnabled()).toBe(false);
    });
  });

  describe('when user enters valid cvc details', () => {
    beforeEach(async () => {
      await cvc.type('123', '123');
    });

    it('should mark the cvc as valid', async () => {
      // Wait for validation state to update
      await states.waitForCvcState(true);
      jestExpect(await states.cvcIsValid()).toBe(true);
    });

    it('submit button should be enabled', async () => {
      // Wait for submit button state to update
      await states.waitForSubmitButtonState(true);
      jestExpect(await states.submitButtonEnabled()).toBe(true);
    });

    it('should support to generate a cvc session', async () => {
      // Wait for validation to complete before submitting
      await states.waitForSubmitButtonState(true);
      await view.submit();

      jestExpect(await cvcSession.text()).toMatch(sessionRegEx);
    });
  });
});
