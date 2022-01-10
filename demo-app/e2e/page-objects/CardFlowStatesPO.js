const {UIComponentPO} = require("./UIComponentPO");

const { LabelPO } = require("./LabelPO");

class CardFlowStatesPO extends UIComponentPO {
  constructor() {
    super("cardFlowE2eStates")

    this.submitButtonEnabledLabel = new LabelPO(
      "cardFlowE2eStates.submitButtonEnabled");
    this.panIsValidLabel = new LabelPO("cardFlowE2eStates.panIsValid");
    this.expiryDateIsValidLabel = new LabelPO(
      "cardFlowE2eStates.expiryDateIsValid");
    this.cvcIsValidLabel = new LabelPO("cardFlowE2eStates.cvcIsValid");
    this.cardBrandLabel = new LabelPO("cardFlowE2eStates.cardBrand");
  }

  async submitButtonEnabled() {
    const text = await this.submitButtonEnabledLabel.text();
    return this.textAsBoolean(text);
  }

  async panIsValid() {
    const text = await this.panIsValidLabel.text();
    return this.textAsBoolean(text);
  }

  async expiryDateIsValid() {
    const text = await this.expiryDateIsValidLabel.text();
    return this.textAsBoolean(text);
  }

  async cvcIsValid() {
    const text = await this.cvcIsValidLabel.text();
    return this.textAsBoolean(text);
  }

  async cardBrand() {
    const text = await this.cardBrandLabel.text();
    return text;
  }

  textAsBoolean(text) {
    if (text === "true") {
      return true;
    } else if (text === "false") {
      return false;
    } else {
      throw new Error(
        `Invalid state, expected boolean text but found value ${text}`);
    }
  }
}

module.exports = { CardFlowStatesPO };
