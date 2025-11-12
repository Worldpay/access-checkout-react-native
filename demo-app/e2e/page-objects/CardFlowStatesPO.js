/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { LabelPO } = require('./LabelPO');
/* eslint-enable @typescript-eslint/no-var-requires */

class CardFlowStatesPO extends UIComponentPO {
  constructor() {
    super('cardFlowE2eStates');

    this.submitButtonEnabledLabel = new LabelPO(
      'cardFlowE2eStates.submitButtonEnabled'
    );
    this.panIsValidLabel = new LabelPO('cardFlowE2eStates.panIsValid');
    this.expiryDateIsValidLabel = new LabelPO(
      'cardFlowE2eStates.expiryDateIsValid'
    );
    this.cvcIsValidLabel = new LabelPO('cardFlowE2eStates.cvcIsValid');
    this.cardBrandLabel = new LabelPO('cardFlowE2eStates.cardBrand');
  }

  async submitButtonEnabled() {
    const text = await this.submitButtonEnabledLabel.text();
    return this.textAsBooleanOrUndefined(text);
  }

  async panIsValid() {
    const text = await this.panIsValidLabel.text();
    return this.textAsBooleanOrUndefined(text);
  }

  async expiryDateIsValid() {
    const text = await this.expiryDateIsValidLabel.text();
    return this.textAsBooleanOrUndefined(text);
  }

  async cvcIsValid() {
    const text = await this.cvcIsValidLabel.text();
    return this.textAsBooleanOrUndefined(text);
  }

  async cardBrand() {
    const text = await this.cardBrandLabel.text();
    return text;
  }

  textAsBooleanOrUndefined(text) {
    if (text === 'true') {
      return true;
    } else if (text === 'false') {
      return false;
    } else if (text === 'undefined') {
      return undefined;
    } else {
      throw new Error(
        `Invalid state, expected boolean text but found value ${text}`
      );
    }
  }
}

module.exports = { CardFlowStatesPO };
