import type { CardValidationEventListener } from '../index';

export class MerchantCardValidationConfig {
  enablePanFormatting?: boolean;
  acceptedCardBrands?: string[];
  validationListener?: CardValidationEventListener;

  constructor({
    validationListener,
    enablePanFormatting = false,
    acceptedCardBrands = [],
  }: MerchantCardValidationConfig) {
    this.enablePanFormatting = enablePanFormatting;
    this.validationListener = validationListener;
    this.acceptedCardBrands = acceptedCardBrands;
  }
}
