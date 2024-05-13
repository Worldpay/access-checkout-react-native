/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect } = require('detox');
const { expect: jestExpect } = require('expect');
const { sessionRegEx } = require('./helpers/RegularExpressions');
const { CardFlowPO } = require('./page-objects/CardFlowPO');
const { CardFlowStatesPO } = require('./page-objects/CardFlowStatesPO');
/* eslint-enable @typescript-eslint/no-var-requires */

describe('Card flow', () => {
  const view = new CardFlowPO();
  const pan = view.pan;
  const expiryDate = view.expiryDate;
  const cvc = view.cvc;
  const cardSession = view.cardSession;
  const cvcSession = view.cvcSession;
  const submitButton = view.submitButton;
  const cardAndCvcSessionsToggle = view.cardAndCvcSessionsToggle;
  const states = new CardFlowStatesPO();

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

    it('should not display the e2e states information', async () => {
      await expect(states.component()).toExist();
      await expect(states.component()).not.toBeVisible();
    });

    it('submit button should be disabled', async () => {
      jestExpect(await states.submitButtonEnabled()).toBe(false);
    });

    it('the pan, expiry date and CVC should be invalid', async () => {
      jestExpect(await states.panIsValid()).toBe(false);
      jestExpect(await states.expiryDateIsValid()).toBe(false);
      jestExpect(await states.cvcIsValid()).toBe(false);
    });
  });

  describe('when user enters valid card details', () => {
    beforeEach(async () => {
      await pan.type('4444333322221111', '4444 3333 2222 1111');
      await expiryDate.type('1234', '12/34');
      await cvc.type('123', '123');
    });

    it('submit button should be enabled', async () => {
      jestExpect(await states.submitButtonEnabled()).toBe(true);
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

    it('should mark the pan as valid', async () => {
      await pan.type('4444333322221111');

      jestExpect(await states.panIsValid()).toBe(true);
    });
  });

  describe('when user enters a valid expiry date', () => {
    beforeEach(async () => {
      await expiryDate.type('1234');
    });

    it('should format expiry date', async () => {
      jestExpect(await expiryDate.text()).toBe('12/34');
    });

    it('should mark the expiry date as valid', async () => {
      jestExpect(await states.expiryDateIsValid()).toBe(true);
    });
  });

  describe('when user enters a valid Cvc', () => {
    it('should mark the Cvc as valid', async () => {
      await cvc.type('123');

      jestExpect(await states.cvcIsValid()).toBe(true);
    });
  });

  describe('when user enters a Visa Pan', () => {
    it('should detect the card brand as visa', async () => {
      await pan.type('4');

      jestExpect(await states.cardBrand()).toBe('visa');
    });
  });

  describe('when user enters a Amex Pan', () => {
    it('should detect the card brand as amex', async () => {
      await pan.type('34');

      jestExpect(await states.cardBrand()).toBe('amex');
    });
  });

  describe('when user enters a Diners Pan', () => {
    it('should detect the card brand as diners', async () => {
      await pan.type('3095');

      jestExpect(await states.cardBrand()).toBe('diners');
    });
  });

  describe('when user enters a discover Pan', () => {
    it('should detect the card brand as discover', async () => {
      await pan.type('6011');

      jestExpect(await states.cardBrand()).toBe('discover');
    });
  });

  describe('when user enters a Jcb Pan', () => {
    it('should detect the card brand as jcb', async () => {
      await pan.type('1800');

      jestExpect(await states.cardBrand()).toBe('jcb');
    });
  });

  describe('when user enters a Maestro Pan', () => {
    it('should detect the card brand as maestro', async () => {
      await pan.type('493698');

      jestExpect(await states.cardBrand()).toBe('maestro');
    });
  });

  describe('when user enters a Mastercard Pan', () => {
    it('should detect the card brand as mastercard', async () => {
      await pan.type('51');

      jestExpect(await states.cardBrand()).toBe('mastercard');
    });
  });
});
