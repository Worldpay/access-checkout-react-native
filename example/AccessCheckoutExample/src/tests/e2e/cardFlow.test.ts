import {device, expect} from 'detox';
import {expect as jestExpect} from 'expect';
import {sessionRegEx} from './helpers/RegularExpressions';
import {CardFlowPO} from './page-objects/CardFlowPO';

describe('Card flow', () => {
  const view = new CardFlowPO();
  const pan = view.pan;
  const expiryDate = view.expiryDate;
  const cvc = view.cvc;
  const cardSession = view.cardSession;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;
  const cardAndCvcSessionsToggle = view.cardAndCvcSessionsToggle;

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('by default', () => {
    it('should display a card form with a toggle & a submit button', async () => {
      await expect(pan.component()).toBeVisible();
      await expect(expiryDate.component()).toBeVisible();
      await expect(cvc.component()).toBeVisible();
      await expect(submitButton.component()).toBeVisible();
      await expect(cardAndCvcSessionsToggle.component()).toBeVisible();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('submit button should be disabled', async () => {
      jestExpect(await submitButton.enabled()).toBe(false);
    });
  });

  describe('when user enters valid card details', () => {
    beforeEach(async () => {
      await pan.type('4444333322221111', '4444 3333 2222 1111');
      await expiryDate.type('1234', '12/34');
      await cvc.type('123', '123');
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('submit button should be enabled', async () => {
      jestExpect(await submitButton.enabled()).toBe(true);
    });

    it('should support to generate a card session', async () => {
      await view.submit();

      jestExpect(await cardSession.text()).toMatch(sessionRegEx);
    });

    it('should support to generate a card and a cvc session', async () => {
      await view.toggleOnCardAndCvcSessions();

      await view.submit();

      jestExpect(await cardSession.text()).toMatch(sessionRegEx);
      jestExpect(await cvcSession.text()).toMatch(sessionRegEx);
    });
  });

  describe('when user enters a valid pan', () => {
    it('should format correctly a visa pan', async () => {
      await pan.type('4444333322221111');

      jestExpect(await pan.text()).toBe('4444 3333 2222 1111');
    });

    it('should format correctly a amex pan', async () => {
      await pan.type('343434343434343');

      jestExpect(await pan.text()).toBe('3434 343434 34343');
    });
  });

  describe('when user enters a valid expiry date', () => {
    beforeEach(async () => {
      await expiryDate.type('1234');
    });

    it('should format expiry date', async () => {
      jestExpect(await expiryDate.text()).toBe('12/34');
    });
  });

  describe('when user enters a valid cvc', () => {
    beforeEach(async () => {
      await cvc.type('123');
    });

    it('should have the expected cvc', async () => {
      jestExpect(await cvc.text()).toBe('123');
    });
  });
});
