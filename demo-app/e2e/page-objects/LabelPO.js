/* eslint-disable @typescript-eslint/no-var-requires */
const { UIComponentPO } = require('./UIComponentPO');
/* eslint-enable @typescript-eslint/no-var-requires */

class LabelPO extends UIComponentPO {
  async text() {
    const attributes = await this.getAttributes();
    return attributes.text;
  }
}

module.exports = { LabelPO };
