/* eslint-disable @typescript-eslint/no-var-requires */
const { SessionLabelPO } = require('./SessionLabelPO');
const { AccessCheckoutTextInputPO } = require('./AccessCheckoutTextInputPO');
const { UIComponentPO } = require('./UIComponentPO');
/* eslint-enable @typescript-eslint/no-var-requires */

class CvcOnlyFlowPO {
  constructor() {
    this.cvcOnlyNavItem = new UIComponentPO('nav-cvc');
    this.cvc = new AccessCheckoutTextInputPO('cvcInput');
    this.submitButton = new UIComponentPO('submitButton');
    this.cvcSession = new SessionLabelPO('cvcSession');
  }

  async selectCvcOnlyFlow() {
    await this.cvcOnlyNavItem.tap();
  }

  async submit() {
    await this.submitButton.tap();
  }
}

module.exports = { CvcOnlyFlowPO };
