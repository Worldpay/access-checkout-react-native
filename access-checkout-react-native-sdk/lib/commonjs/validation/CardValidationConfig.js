"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardValidationConfig = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class CardValidationConfig {
  constructor({
    validationListener,
    enablePanFormatting = false,
    acceptedCardBrands = []
  }) {
    _defineProperty(this, "enablePanFormatting", void 0);
    _defineProperty(this, "acceptedCardBrands", void 0);
    _defineProperty(this, "validationListener", void 0);
    this.enablePanFormatting = enablePanFormatting;
    this.validationListener = validationListener;
    this.acceptedCardBrands = acceptedCardBrands;
  }
}
exports.CardValidationConfig = CardValidationConfig;
//# sourceMappingURL=CardValidationConfig.js.map