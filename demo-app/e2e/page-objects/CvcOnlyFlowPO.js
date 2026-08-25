const { SessionLabelPO } = require('./SessionLabelPO');
const { AccessCheckoutTextInputPO } = require('./AccessCheckoutTextInputPO');
const { UIComponentPO } = require('./UIComponentPO');
const { waitFor } = require('detox');

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

    await this.cvcOnlyNavItem.tap();

    await waitFor(this.cvc.component())
      .toBeVisible()
      .withTimeout(10000);
  }

  async submit() {
    await this.submitButton.tap();
  }
}

module.exports = { CvcOnlyFlowPO };
