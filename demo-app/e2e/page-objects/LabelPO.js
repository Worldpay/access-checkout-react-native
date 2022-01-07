const { UIComponentPO } = require("./UIComponentPO");

class LabelPO extends UIComponentPO {
  async text() {
    const attributes = await this.getAttributes();
    return attributes.text;
  }
}

module.exports = { LabelPO };
