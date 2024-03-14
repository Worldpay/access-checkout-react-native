import {by, device, element, expect} from 'detox';

describe('ExampleAccessCheckoutApp', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should start application', async () => {
    await expect(element(by.id('app-title'))).toBeVisible();
    await expect(element(by.id('app-title'))).toHaveText(
      'EXAMPLE ACCESS CHECKOUT APP',
    );
  });
});
