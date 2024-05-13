import {UIComponentPO} from './UIComponentPO.ts';
import {device, waitFor} from 'detox';
import {TIMEOUT_IN_MS} from '../Options.ts';

export class SubmitButtonPO extends UIComponentPO {
  async enabled() {
    await waitFor(this.component()).toExist().withTimeout(TIMEOUT_IN_MS);

    const attributes = await this.getAttributes();

    //Android Hack: the enabled is always true therefore we use the elevation to workout whether the button is enabled or not.
    //When disabled elevation is always 0 when enabled elevation is > 0

    //iOS: this is not supported :(

    const isEnabled =
      device.getPlatform() === 'ios'
        ? (attributes as Detox.IosElementAttributes).enabled
        : (attributes as Detox.AndroidElementAttributes).elevation > 0;

    return isEnabled;
  }
}
