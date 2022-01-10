const { UIComponentPO } = require("./UIComponentPO");
const { expect } = require("detox");

class TextInputPO extends UIComponentPO {
  async type(text, expectedText = "") {
    await this.component().typeText(text);

    if (expectedText) {
      await expect(this.component()).toHaveText(expectedText);
    }
  }

  async text() {
    const attributes = await this.getAttributes();
    return attributes.text;
  }
}

module.exports = { TextInputPO };
