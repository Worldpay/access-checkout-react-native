/* eslint-disable @typescript-eslint/no-var-requires */
const { SessionLabelPO } = require('./SessionLabelPO');
const { TextInputPO } = require('./TextInputPO');
const { TogglePO } = require('./TogglePO');
const { UIComponentPO } = require('./UIComponentPO');
/* eslint-enable @typescript-eslint/no-var-requires */

class CardFlowPO {
  constructor() {
    this.pan = new TextInputPO('panInput');
    this.expiryDate = new TextInputPO('expiryDateInput');
    this.cvc = new TextInputPO('cvcInput');
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
