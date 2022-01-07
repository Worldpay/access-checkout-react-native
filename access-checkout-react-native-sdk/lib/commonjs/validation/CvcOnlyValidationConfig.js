"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CvcOnlyValidationConfig {
  constructor(_ref) {
    let {
      cvcId
    } = _ref;

    _defineProperty(this, "cvcId", void 0);

    this.cvcId = cvcId;
  }

}

exports.default = CvcOnlyValidationConfig;
//# sourceMappingURL=CvcOnlyValidationConfig.js.map