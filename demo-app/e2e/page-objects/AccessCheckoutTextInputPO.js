/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { expect, element, by, device } = require('detox');
const { waitForValidation } = require('../helpers/TestHelpers');
/* eslint-enable @typescript-eslint/no-var-requires */

class AccessCheckoutTextInputPO extends UIComponentPO {
  component() {
    const selector =
      device.getPlatform() === 'ios'
        ? by.type('UITextField')
        : by.type('android.widget.EditText');

    return element(selector.withAncestor(by.id(this.id)));
  }

  async type(text, expectedText = '') {
    // Clear existing text first to avoid appending
    await this.component().clearText();

    // Use typeText which types character-by-character
    // This properly triggers React Native's onChangeText and formatting logic on both platforms
    await this.component().typeText(text);

    if (expectedText) {
      await expect(this.component()).toHaveText(expectedText);
    }

    // Wait for async validation to complete after typing
    await waitForValidation();
  }

  async text() {
    const attributes = await this.getAttributes();
    return attributes.text;
  }

  async clickOutside() {
    // iOS doesn't dismiss keyboard on tap - use scroll gesture instead
    // This works with ScrollView's keyboardDismissMode={'on-drag'}
    await element(by.id('root')).swipe('down', 'fast', 0.1);

    // Wait for blur event to complete (iOS needs more time)
    await waitForValidation(500);
  }
}

module.exports = { AccessCheckoutTextInputPO };
