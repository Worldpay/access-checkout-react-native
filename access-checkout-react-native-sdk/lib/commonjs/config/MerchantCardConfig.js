"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class MerchantCardConfig {
  constructor({
    panId,
    expiryDateId,
    cvcId,
    validationConfig
  }) {
    this.panId = panId;
    this.expiryDateId = expiryDateId;
    this.cvcId = cvcId;
    this.validationConfig = validationConfig;
  }
}
exports.default = MerchantCardConfig;
//# sourceMappingURL=MerchantCardConfig.js.map