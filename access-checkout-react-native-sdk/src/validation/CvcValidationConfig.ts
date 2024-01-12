import type { CardValidationEventListener } from '../index';

export class CvcValidationConfig {
  validationListener?: CardValidationEventListener;

  constructor({ validationListener }: CvcValidationConfig) {
    this.validationListener = validationListener;
  }
}
