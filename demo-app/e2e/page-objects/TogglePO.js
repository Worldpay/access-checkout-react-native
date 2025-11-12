/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { expect } = require('detox');
const { TIMEOUT_IN_MS } = require('./Options');
/* eslint-enable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { waitFor } = require('detox');

class TogglePO extends UIComponentPO {
  constructor(id) {
    super(id);
  }

  async toggleOn() {
    if (!(await this.isToggled())) {
      await this.tap();
      await waitFor(this.component())
        .toHaveToggleValue(true)
        .withTimeout(TIMEOUT_IN_MS);
    }

    await expect(this.component()).toHaveToggleValue(true);
  }

  async isToggled() {
    try {
      await expect(this.component()).toHaveToggleValue(true);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { TogglePO };
