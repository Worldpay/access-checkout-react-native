import {UIComponentPO} from '../base/UIComponentPO.ts';
import {expect} from 'detox';

export class TogglePO extends UIComponentPO {
  constructor(id: string) {
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
