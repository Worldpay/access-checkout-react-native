/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect } = require('detox');
const { expect: jestExpect } = require('expect');
const { sessionRegEx } = require('./helpers/RegularExpressions');
const { CvcOnlyFlowPO } = require('./page-objects/CvcOnlyFlowPO');
const { CvcOnlyFlowStatesPO } = require('./page-objects/CvcOnlyFlowStatesPO');
/* eslint-enable @typescript-eslint/no-var-requires */

describe('CVC only flow', () => {
  const view = new CvcOnlyFlowPO();
  const cvc = view.cvc;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;
  const states = new CvcOnlyFlowStatesPO();

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await view.selectCvcOnlyFlow();
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
      jestExpect(await states.cvcIsValid()).toBe(true);
    });

    it('submit button should be enabled', async () => {
      jestExpect(await states.submitButtonEnabled()).toBe(true);
    });

    it('should support to generate a cvc session', async () => {
      await view.submit();

      jestExpect(await cvcSession.text()).toMatch(sessionRegEx);
    });
  });

});
