function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class CardValidationConfig {
  constructor({
    panId,
    expiryDateId,
    cvcId,
    enablePanFormatting,
    acceptedCardBrands
  }) {
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
//# sourceMappingURL=CardValidationConfig.js.map