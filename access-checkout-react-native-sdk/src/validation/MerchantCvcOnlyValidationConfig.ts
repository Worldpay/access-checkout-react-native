import type { CardValidationEventListener } from '../index';

export class MerchantCvcOnlyValidationConfig {
  validationListener?: CardValidationEventListener;

  constructor({ validationListener }: MerchantCvcOnlyValidationConfig) {
    this.validationListener = validationListener;
  }
}
