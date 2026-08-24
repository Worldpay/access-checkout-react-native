/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect, waitFor } = require('detox');
const { CardFlowPO } = require('./page-objects/CardFlowPO');
const { launchAppOptimized, resetAppState } = require('./helpers/AppLifecycle');

describe('Card flow', () => {
  const view = new CardFlowPO();
  const pan = view.pan;
  const expiryDate = view.expiryDate;
  const cvc = view.cvc;

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

  describe('field focus transitions', () => {
    it('should transfer focus from PAN to expiry date', async () => {
      // Focus PAN field
      await pan.tap();
      await expect(pan.component()).toBeFocused();

      // Focus expiry field
      await expiryDate.tap();

      // Wait for PAN to lose focus
      await waitFor(pan.component())
        .not.toBeFocused()
        .withTimeout(2000);

      // Verify expiry field now has focus
      await expect(expiryDate.component()).toBeFocused();
    });

    it('should transfer focus from expiry date to CVC', async () => {
      // Focus expiry field
      await expiryDate.tap();
      await expect(expiryDate.component()).toBeFocused();

      // Focus CVC field
      await cvc.tap();

      // Wait for expiry to lose focus
      await waitFor(expiryDate.component())
        .not.toBeFocused()
        .withTimeout(2000);

      // Verify CVC field now has focus
      await expect(cvc.component()).toBeFocused();
    });

    it('should transfer focus from CVC back to PAN', async () => {
      // Focus CVC field
      await cvc.tap();
      await expect(cvc.component()).toBeFocused();

      // Focus PAN field
      await pan.tap();

      // Wait for CVC to lose focus
      await waitFor(cvc.component())
        .not.toBeFocused()
        .withTimeout(2000);

      // Verify PAN field now has focus
      await expect(pan.component()).toBeFocused();
    });
  });
});
