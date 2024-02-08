"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCvcOnlyConfig = useCvcOnlyConfig;
var _MerchantCvcOnlyConfig = _interopRequireDefault(require("../config/MerchantCvcOnlyConfig"));
var _MerchantCvcOnlyValidationConfig = require("../validation/MerchantCvcOnlyValidationConfig");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useCvcOnlyConfig({
  cvcId,
  validationConfig
}) {
  const cardConfig = new _MerchantCvcOnlyConfig.default({
    cvcId
  });
  if (validationConfig) {
    cardConfig.validationConfig = new _MerchantCvcOnlyValidationConfig.MerchantCvcOnlyValidationConfig({
      validationListener: validationConfig.validationListener
    });
  }
  return cardConfig;
}
//# sourceMappingURL=useCvcOnlyConfig.js.map