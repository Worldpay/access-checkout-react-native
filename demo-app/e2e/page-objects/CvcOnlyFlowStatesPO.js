/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { LabelPO } = require('./LabelPO');
const { waitForState } = require('../helpers/TestHelpers');
/* eslint-enable @typescript-eslint/no-var-requires */

class CvcOnlyFlowStatesPO extends UIComponentPO {
  constructor() {
    super('cvcOnlyFlowE2eStates');

    this.submitButtonEnabledLabel = new LabelPO(
      'cvcOnlyFlowE2eStates.submitButtonEnabled'
    );
    this.cvcIsValidLabel = new LabelPO('cvcOnlyFlowE2eStates.cvcIsValid');
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

module.exports = { CvcOnlyFlowStatesPO };
