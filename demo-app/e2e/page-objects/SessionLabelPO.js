/* eslint-disable @typescript-eslint/no-var-requires */
const { waitFor } = require('detox');
const { UIComponentPO } = require('./UIComponentPO');
const { TIMEOUT_IN_MS } = require('./Options');
/* eslint-enable @typescript-eslint/no-var-requires */

class SessionLabelPO extends UIComponentPO {
  constructor(id) {
    super(id);
  }

  async text() {
    await waitFor(this.component()).toBeVisible().withTimeout(TIMEOUT_IN_MS);

    const attributes = await this.getAttributes();
    return attributes.text;
  }
}

module.exports = { SessionLabelPO };
