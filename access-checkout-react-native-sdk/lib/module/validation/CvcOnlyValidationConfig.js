function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default class CvcOnlyValidationConfig {
  constructor(_ref) {
    let {
      cvcId
    } = _ref;

    _defineProperty(this, "cvcId", void 0);

    this.cvcId = cvcId;
  }

}
//# sourceMappingURL=CvcOnlyValidationConfig.js.map