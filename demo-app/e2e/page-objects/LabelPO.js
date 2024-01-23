/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { waitFor } = require('detox');
const { TIMEOUT_IN_MS } = require('./Options');

/* eslint-enable @typescript-eslint/no-var-requires */

class LabelPO extends UIComponentPO {
  async text() {
    await waitFor(this.component()).toExist().withTimeout(TIMEOUT_IN_MS);
    const attributes = await this.getAttributes();
    return attributes.text;
  }
}

module.exports = { LabelPO };
