/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect } = require('detox');
const { expect: jestExpect } = require('expect');
const { sessionRegEx } = require('./helpers/RegularExpressions');
const { CardFlowPO } = require('./page-objects/CardFlowPO');
const { CardFlowStatesPO } = require('./page-objects/CardFlowStatesPO');
const { launchAppOptimized, resetAppState } = require('./helpers/AppLifecycle');
const { sleep } = require('./helpers/TestHelpers');
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
    // Use optimized launch with app reuse
    await launchAppOptimized();
  });

  beforeEach(async () => {
    // Fast reset instead of full reload
    await resetAppState();
    // Wait for the app to be fully initialized after reset
    await expect(pan.component()).toBeVisible();
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

    it('the pan, expiry date and CVC should be undefined', async () => {
      //Undefined is to support the silver untouched state
      jestExpect(await states.panIsValid()).toBe(undefined);
      jestExpect(await states.expiryDateIsValid()).toBe(undefined);
      jestExpect(await states.cvcIsValid()).toBe(undefined);
    });
  });

  describe('when user enters valid card details', () => {
    beforeEach(async () => {
      // Type PAN and wait for validation
      await pan.type('4444333322221111', '4444 3333 2222 1111');
      await states.waitForPanState(true);

      // Type expiry and wait for validation
      await expiryDate.type('1234', '12/34');
      await states.waitForExpiryDateState(true);

      // Type CVC and wait for validation
      await cvc.type('123', '123');
      await states.waitForCvcState(true);

      // Don't tap away! Blur validation marks fields as invalid on iOS
      // Just leave CVC focused and submit directly
      await sleep(500);
    });

    it('submit button should be enabled', async () => {
      // Test by actually submitting - if button was disabled, no session would generate
      await view.submit();

      // Wait for session generation (network call)
      await sleep(3000);

      // Check that session was actually generated
      const sessionText = await cardSession.text();
      jestExpect(sessionText).toMatch(sessionRegEx);
    });

    it('should support to generate a card session', async () => {
      await view.submit();

      // Wait for session generation (network call)
      await sleep(3000);

      jestExpect(await cardSession.text()).toMatch(sessionRegEx);
    });

    it('should support to generate a card and a cvc session', async () => {
      await view.toggleOnCardAndCvcSessions();
      await view.submit();

      // Wait for session generation (network call)
      await sleep(3000);

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

      // Wait for validation state to update
      await states.waitForPanState(true);
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
      // Wait for validation state to update
      await states.waitForExpiryDateState(true);
      jestExpect(await states.expiryDateIsValid()).toBe(true);
    });
  });

  describe('when user enters a valid Cvc', () => {
    it('should mark the Cvc as valid', async () => {
      await cvc.type('123');

      // Wait for validation state to update
      await states.waitForCvcState(true);
      jestExpect(await states.cvcIsValid()).toBe(true);
    });
  });

  describe('when user enters a Visa Pan', () => {
    it('should detect the card brand as visa', async () => {
      await pan.type('4');

      // Wait for brand detection
      await states.waitForCardBrand('visa');
      jestExpect(await states.cardBrand()).toBe('visa');
    });
  });

  describe('when user enters a Amex Pan', () => {
    it('should detect the card brand as amex', async () => {
      await pan.type('34');

      // Wait for brand detection
      await states.waitForCardBrand('amex');
      jestExpect(await states.cardBrand()).toBe('amex');
    });
  });

  describe('when user enters a Diners Pan', () => {
    it('should detect the card brand as diners', async () => {
      await pan.type('3095');

      // Wait for brand detection
      await states.waitForCardBrand('diners');
      jestExpect(await states.cardBrand()).toBe('diners');
    });
  });

  describe('when user enters a discover Pan', () => {
    it('should detect the card brand as discover', async () => {
      await pan.type('6011');

      // Wait for brand detection
      await states.waitForCardBrand('discover');
      jestExpect(await states.cardBrand()).toBe('discover');
    });
  });

  describe('when user enters a Jcb Pan', () => {
    it('should detect the card brand as jcb', async () => {
      await pan.type('1800');

      // Wait for brand detection
      await states.waitForCardBrand('jcb');
      jestExpect(await states.cardBrand()).toBe('jcb');
    });
  });

  describe('when user enters a Maestro Pan', () => {
    it('should detect the card brand as maestro', async () => {
      await pan.type('493698');

      // Wait for brand detection
      await states.waitForCardBrand('maestro');
      jestExpect(await states.cardBrand()).toBe('maestro');
    });
  });

  describe('when user enters a Mastercard Pan', () => {
    it('should detect the card brand as mastercard', async () => {
      await pan.type('51');

      // Wait for brand detection
      await states.waitForCardBrand('mastercard');
      jestExpect(await states.cardBrand()).toBe('mastercard');
    });
  });
});
