"use strict";

export class MerchantCardValidationConfig {
  constructor({
    validationListener,
    enablePanFormatting = false,
    acceptedCardBrands = []
  }) {
    this.enablePanFormatting = enablePanFormatting;
    this.validationListener = validationListener;
    this.acceptedCardBrands = acceptedCardBrands;
  }
}
//# sourceMappingURL=MerchantCardValidationConfig.js.map