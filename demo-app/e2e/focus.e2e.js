/* eslint-disable @typescript-eslint/no-var-requires */
const { device, expect } = require('detox');
const { CardFlowPO } = require('./page-objects/CardFlowPO');

describe('Card flow', () => {
  const view = new CardFlowPO();
  const pan = view.pan;

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('when tapping outside of a card field', () => {
    it('focus should be removed from that field', async () => {
      await pan.tap();
      await expect(pan.component()).toBeFocused();

      await pan.clickOutside();

      await expect(pan.component()).not.toBeFocused();
    });
  });
});
