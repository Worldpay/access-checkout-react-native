/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect } = require('detox');
const jestExpect = require('expect');
const {
  cvcSessionRegEx,
  verifiedTokensSessionRegEx,
} = require('./helpers/RegularExpressions');
const { CvcFlowPO } = require('./page-objects/CvcFlowPO');
const { CvcFlowStatesPO } = require('./page-objects/CvcFlowStatesPO');
/* eslint-enable @typescript-eslint/no-var-requires */

describe('Cvc flow', () => {
  const view = new CvcFlowPO();
  const cvc = view.cvc;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;
  const states = new CvcFlowStatesPO();

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
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

    it('the CVC should be invalid', async () => {
      jestExpect(await states.cvcIsValid()).toBe(false);
    });
  });

  describe('when user enters valid cvc details', () => {
    beforeEach(async () => {
      await cvc.type('123', '123');
    });

    it('submit button should be enabled', async () => {
      jestExpect(await states.submitButtonEnabled()).toBe(true);
    });

    it('should support to generate a cvc session', async () => {
      await view.submit();

      jestExpect(await cvcSession.text()).toMatch(verifiedTokensSessionRegEx);
    });
  });

  describe('when user enters a valid Cvc', () => {
    it('should mark the Cvc as valid', async () => {
      await cvc.type('123');

      jestExpect(await states.cvcIsValid()).toBe(true);
    });
  });
});
