/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { LabelPO } = require('./LabelPO');
/* eslint-enable @typescript-eslint/no-var-requires */

class CvcFlowStatesPO extends UIComponentPO {
  constructor() {
    super('cvcFlowE2eStates');

    this.submitButtonEnabledLabel = new LabelPO(
      'cvcFlowE2eStates.submitButtonEnabled'
    );
    this.cvcIsValidLabel = new LabelPO('cvcFlowE2eStates.cvcIsValid');
  }

  async submitButtonEnabled() {
    const text = await this.submitButtonEnabledLabel.text();
    return this.textAsBoolean(text);
  }

  async cvcIsValid() {
    const text = await this.cvcIsValidLabel.text();
    return this.textAsBoolean(text);
  }

  textAsBoolean(text) {
    if (text === 'true') {
      return true;
    } else if (text === 'false') {
      return false;
    } else {
      throw new Error(
        `Invalid state, expected boolean text but found value ${text}`
      );
    }
  }
}

module.exports = { CvcFlowStatesPO };
