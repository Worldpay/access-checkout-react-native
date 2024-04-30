/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { element, by, expect } = require('detox');

class UIComponentPO {
  constructor(id) {
    this.id = id;
  }

  component() {
    return element(by.id(this.id));
  }

  async expectToExist() {
    await expect(this.component()).toExist();
  }

  async tap() {
    await this.component().tap();
  }

  async getAttributes() {
    return await this.component().getAttributes();
  }
}

module.exports = { UIComponentPO };
