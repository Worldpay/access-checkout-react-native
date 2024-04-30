import {device, expect} from 'detox';
import {expect as jestExpect} from 'expect';
import {sessionRegEx} from './helpers/RegularExpressions';
import {CvcOnlyFlowPO} from './page-objects/CvcOnlyFlowPO';

describe('CVC only flow', () => {
  const view = new CvcOnlyFlowPO();
  const cvc = view.cvc;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;

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

  describe('user can enter cvc details', () => {
    it('should be able to cvc number', async () => {
      await cvc.type('123', '123');

      jestExpect(await cvc.text()).toMatch('123');
    });
  });

  describe('when user enters valid cvc details', () => {
    beforeEach(async () => {
      await cvc.type('123', '123');
    });

    it('should support to generate a cvc session', async () => {
      await view.submit();

      jestExpect(await cvcSession.text()).toMatch(sessionRegEx);
    });
  });
});
