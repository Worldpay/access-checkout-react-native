import {device, expect} from 'detox';
import {expect as jestExpect} from 'expect';
import {sessionRegEx} from './helpers/RegularExpressions';
import {CardAndCvcFlowPO} from './page-objects/CardAndCvcFlowPO.ts';

describe('Card and Cvc flow', () => {
  const view = new CardAndCvcFlowPO();
  const pan = view.pan;
  const expiryDate = view.expiryDate;
  const cvc = view.cvc;
  const cardSession = view.cardSession;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;

  beforeEach(async () => {
    await device.reloadReactNative();
    await view.selectCardAndCvcOnlyFlow();
  });

  describe('by default', () => {
    it('should display a card form & a submit button', async () => {
      await expect(pan.component()).toBeVisible();
      await expect(expiryDate.component()).toBeVisible();
      await expect(cvc.component()).toBeVisible();
      await expect(submitButton.component()).toBeVisible();
    });
  });

  describe('user can enter card details', () => {
    it('should be able to enter pan number', async () => {
      await pan.type('4444333322221111');

      jestExpect(await pan.text()).toMatch('4444 3333 2222 1111');
    });

    it('should be able to enter expiry date', async () => {
      await expiryDate.type('1234');

      jestExpect(await expiryDate.text()).toMatch('12/34');
    });

    it('should be able to cvc number', async () => {
      await cvc.type('123', '123');

      jestExpect(await cvc.text()).toMatch('123');
    });
  });

  describe('when user enters valid card details', () => {
    beforeEach(async () => {
      await pan.type('4444333322221111', '4444 3333 2222 1111');
      await expiryDate.type('1234', '12/34');
      await cvc.type('123', '123');
    });

    it('should support to generating a card and a cvc session', async () => {
      await view.submit();

      jestExpect(await cardSession.text()).toMatch(sessionRegEx);
      jestExpect(await cvcSession.text()).toMatch(sessionRegEx);
    });
  });
});
