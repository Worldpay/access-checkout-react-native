import {by, element, expect} from 'detox';

export class UIComponentPO {
  public id: string;
  constructor(id: string) {
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
    const attributes = await this.component().getAttributes();
    if ('elements' in attributes) {
      return attributes.elements[0];
    }
    return attributes;
  }
}
