/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { element, by, expect } = require('detox');

class UIComponentPO {
  constructor(id) {
    this.id = id;
  }

  component() {
    return element(by.id(this.id));
  }

  async expectToExist() {
    await expect(this.component()).toExist();
  }

  async tap() {
    // Add retry logic for tap action to handle timing issues
    // after React Native reloads, especially on Android
    const maxRetries = 3;
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
      try {
        if (i > 0) {
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        await this.component().tap();
        return; // Success!
      } catch (error) {
        lastError = error;
        // If it's the last retry, throw the error
        if (i === maxRetries - 1) {
          throw error;
        }
      }
    }
  }

  async getAttributes() {
    return await this.component().getAttributes();
  }
}

module.exports = { UIComponentPO };
