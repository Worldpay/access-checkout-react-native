"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCvcOnlyConfig = useCvcOnlyConfig;
var _CvcOnlyConfig = _interopRequireDefault(require("../config/CvcOnlyConfig"));
var _CvcValidationConfig = require("../validation/CvcValidationConfig");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useCvcOnlyConfig({
  cvcId,
  validationConfig
}) {
  const cardConfig = new _CvcOnlyConfig.default({
    cvcId
  });
  if (validationConfig) {
    cardConfig.validationConfig = new _CvcValidationConfig.CvcValidationConfig({
      validationListener: validationConfig.validationListener
    });
  }
  return cardConfig;
}
//# sourceMappingURL=useCvcOnlyConfig.js.map