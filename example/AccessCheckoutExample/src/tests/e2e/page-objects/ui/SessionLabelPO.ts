import {waitFor} from 'detox';
import {UIComponentPO} from '../base/UIComponentPO.ts';
import {API_CALL_TIMEOUT_IN_MS} from '../Options.ts';

export class SessionLabelPO extends UIComponentPO {
  async text() {
    await waitFor(this.component())
      .toExist()
      .withTimeout(API_CALL_TIMEOUT_IN_MS);

    const attributes = await this.getAttributes();
    return attributes.text;
  }
}
