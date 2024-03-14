import {device, expect} from 'detox';
import {expect as jestExpect} from 'expect';
import {sessionRegEx} from './helpers/RegularExpressions';
import {CvcOnlyFlowPO} from './page-objects/CvcOnlyFlowPO';

describe('CVC only flow', () => {
  const view = new CvcOnlyFlowPO();
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

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('submit button should be disabled', async () => {
      jestExpect(await submitButton.enabled()).toBe(false);
    });
  });

  describe('when user enters invalid cvc details', () => {
    beforeEach(async () => {
      await cvc.type('12', '12');
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('submit button should be disabled', async () => {
      jestExpect(await submitButton.enabled()).toBe(false);
    });
  });

  describe('when user enters valid cvc details', () => {
    beforeEach(async () => {
      await cvc.type('123', '123');
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('submit button should be enabled', async () => {
      jestExpect(await submitButton.enabled()).toBe(true);
    });

    it('should mark the cvc as valid', async () => {
      jestExpect(await cvc.text()).toBe('123');
    });

    it('should support to generate a cvc session', async () => {
      await view.submit();

      jestExpect(await cvcSession.text()).toMatch(sessionRegEx);
    });
  });
});
