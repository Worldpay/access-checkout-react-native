/* eslint-disable @typescript-eslint/no-var-requires */
const { SessionLabelPO } = require('./SessionLabelPO');
const { TextInputPO } = require('./TextInputPO');
const { UIComponentPO } = require('./UIComponentPO');
/* eslint-enable @typescript-eslint/no-var-requires */

class CvcOnlyFlowPO {
  constructor() {
    this.cvcOnlyNavItem = new UIComponentPO('nav-cvc');
    this.cvc = new TextInputPO('cvcInput');
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
