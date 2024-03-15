import {UIComponentPO} from './UIComponentPO.ts';

import {by, device, element, expect} from 'detox';

export class AccessCheckoutTextInputPO extends UIComponentPO {
  component() {
    const selector =
      device.getPlatform() === 'ios'
        ? by.type('UITextField')
        : by.type('android.widget.EditText');

    return element(selector.withAncestor(by.id(this.id)));
  }

  async type(text: string, expectedText = '') {
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
