/* eslint-disable @typescript-eslint/no-var-requires */
const { SessionLabelPO } = require('./SessionLabelPO');
const { TogglePO } = require('./TogglePO');
const { UIComponentPO } = require('./UIComponentPO');
const { AccessCheckoutTextInputPO } = require('./AccessCheckoutTextInputPO');
/* eslint-enable @typescript-eslint/no-var-requires */

class CardFlowPO {
  constructor() {
    this.pan = new AccessCheckoutTextInputPO('panInput');
    this.expiryDate = new AccessCheckoutTextInputPO('expiryDateInput');
    this.cvc = new AccessCheckoutTextInputPO('cvcInput');
    this.submitButton = new UIComponentPO('submitButton');
    this.cardAndCvcSessionsToggle = new TogglePO('cardAndCvcSessionsToggle');
    this.cardSession = new SessionLabelPO('cardSession');
    this.cvcSession = new SessionLabelPO('cvcSession');
  }

  async toggleOnCardAndCvcSessions() {
    await this.cardAndCvcSessionsToggle.toggleOn();
  }

  async submit() {
    await this.submitButton.tap();
  }
}

module.exports = { CardFlowPO };
