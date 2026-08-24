/* eslint-disable @typescript-eslint/no-var-requires */
const { SessionLabelPO } = require('./SessionLabelPO');
const { AccessCheckoutTextInputPO } = require('./AccessCheckoutTextInputPO');
const { UIComponentPO } = require('./UIComponentPO');
const { expect, waitFor } = require('detox');
/* eslint-enable @typescript-eslint/no-var-requires */

class CvcOnlyFlowPO {
  constructor() {
    this.cvcOnlyNavItem = new UIComponentPO('nav-cvc');
    this.cvc = new AccessCheckoutTextInputPO('cvcInput');
    this.submitButton = new UIComponentPO('submitButton');
    this.cvcSession = new SessionLabelPO('cvcSession');
  }

  async selectCvcOnlyFlow() {
    // Wait for navigation to be visible and ready before tapping
    // This is especially important on Android after React Native reloads
    await waitFor(this.cvcOnlyNavItem.component())
      .toBeVisible()
      .withTimeout(5000);

    // Tap now includes retry logic to handle timing issues
    await this.cvcOnlyNavItem.tap();
  }

  async submit() {
    await this.submitButton.tap();
  }
}

module.exports = { CvcOnlyFlowPO };
