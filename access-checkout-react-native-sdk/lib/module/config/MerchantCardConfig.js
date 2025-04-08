"use strict";

export default class MerchantCardConfig {
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
//# sourceMappingURL=MerchantCardConfig.js.map