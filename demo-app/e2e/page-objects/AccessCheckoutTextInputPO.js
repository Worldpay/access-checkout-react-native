/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { expect, element, by, device } = require('detox');
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
    await this.component().typeText(text);

    if (expectedText) {
      await expect(this.component()).toHaveText(expectedText);
    }
  }

  async text() {
    const attributes = await this.getAttributes();
    return attributes.text;
  }
}

module.exports = { AccessCheckoutTextInputPO };
