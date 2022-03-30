/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
const { expect } = require('detox');
/* eslint-enable @typescript-eslint/no-var-requires */

class TogglePO extends UIComponentPO {
  constructor(id) {
    super(id);
  }

  async toggleOn() {
    if (!(await this.isToggled())) {
      await this.tap();
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
