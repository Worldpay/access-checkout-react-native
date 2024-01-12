import type { CardValidationEventListener } from '../index';

export class CardValidationConfig {
  enablePanFormatting?: boolean;
  acceptedCardBrands?: string[];
  validationListener?: CardValidationEventListener;

  constructor({
    validationListener,
    enablePanFormatting = false,
    acceptedCardBrands = [],
  }: CardValidationConfig) {
    this.enablePanFormatting = enablePanFormatting;
    this.validationListener = validationListener;
    this.acceptedCardBrands = acceptedCardBrands;
  }
}
