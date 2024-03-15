import {UIComponentPO} from './UIComponentPO.ts';
import {waitFor} from 'detox';
import {TIMEOUT_IN_MS} from '../Options.ts';

export class LabelPO extends UIComponentPO {
  async text() {
    await waitFor(this.component()).toExist().withTimeout(TIMEOUT_IN_MS);
    const attributes = await this.getAttributes();
    return attributes.text;
  }
}
