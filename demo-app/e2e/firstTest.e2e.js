describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a pan input component', async () => {
    await expect(element(by.id('panInput'))).toBeVisible();
  });
});
