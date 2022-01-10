"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CardValidationConfig {
  constructor(_ref) {
    let {
      panId,
      expiryDateId,
      cvcId,
      enablePanFormatting,
      acceptedCardBrands
    } = _ref;

    _defineProperty(this, "panId", void 0);

    _defineProperty(this, "expiryDateId", void 0);

    _defineProperty(this, "cvcId", void 0);

    _defineProperty(this, "enablePanFormatting", false);

    _defineProperty(this, "acceptedCardBrands", []);

    this.panId = panId;
    this.expiryDateId = expiryDateId;
    this.cvcId = cvcId;
    this.enablePanFormatting = enablePanFormatting ? enablePanFormatting : false;
    this.acceptedCardBrands = acceptedCardBrands ? acceptedCardBrands : [];
  }

}

exports.default = CardValidationConfig;
//# sourceMappingURL=CardValidationConfig.js.map