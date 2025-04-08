"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MerchantCardValidationConfig = void 0;
class MerchantCardValidationConfig {
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
exports.MerchantCardValidationConfig = MerchantCardValidationConfig;
//# sourceMappingURL=MerchantCardValidationConfig.js.map