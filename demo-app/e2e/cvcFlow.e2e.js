/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect } = require('detox');
const jestExpect = require('expect');
const { cvcSessionRegEx } = require('./helpers/RegularExpressions');
const { CvcFlowPO } = require('./page-objects/CvcFlowPO');
/* eslint-enable @typescript-eslint/no-var-requires */

describe('Cvc flow', () => {
  const view = new CvcFlowPO();
  const cvc = view.cvc;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;

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
  });

  describe('when user enters valid cvc details', () => {
    beforeEach(async () => {
      await cvc.type('123', '123');
    });

    it('should support to generate a cvc session', async () => {
      await view.submit();

      jestExpect(await cvcSession.text()).toMatch(cvcSessionRegEx);
    });
  });
});
