/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { LabelPO } = require('./LabelPO');
const { waitForState } = require('../helpers/TestHelpers');
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

  /**
   * Waits for submit button to reach expected state with retry logic
   */
  async waitForSubmitButtonState(expectedState, timeout = 5000) {
    return waitForState(
      () => this.submitButtonEnabled(),
      expectedState,
      timeout
    );
  }

  async panIsValid() {
    const text = await this.panIsValidLabel.text();
    return this.textAsBooleanOrUndefined(text);
  }

  /**
   * Waits for pan validation state to reach expected value
   */
  async waitForPanState(expectedState, timeout = 5000) {
    return waitForState(
      () => this.panIsValid(),
      expectedState,
      timeout
    );
  }

  async expiryDateIsValid() {
    const text = await this.expiryDateIsValidLabel.text();
    return this.textAsBooleanOrUndefined(text);
  }

  /**
   * Waits for expiry date validation state to reach expected value
   */
  async waitForExpiryDateState(expectedState, timeout = 5000) {
    return waitForState(
      () => this.expiryDateIsValid(),
      expectedState,
      timeout
    );
  }

  async cvcIsValid() {
    const text = await this.cvcIsValidLabel.text();
    return this.textAsBooleanOrUndefined(text);
  }

  /**
   * Waits for CVC validation state to reach expected value
   */
  async waitForCvcState(expectedState, timeout = 5000) {
    return waitForState(
      () => this.cvcIsValid(),
      expectedState,
      timeout
    );
  }

  async cardBrand() {
    const text = await this.cardBrandLabel.text();
    return text;
  }

  /**
   * Waits for card brand to reach expected value
   */
  async waitForCardBrand(expectedBrand, timeout = 5000) {
    return waitForState(
      () => this.cardBrand(),
      expectedBrand,
      timeout
    );
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
