"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCardConfig = void 0;
var _CardValidationConfig = require("../validation/CardValidationConfig");
var _CardConfig = _interopRequireDefault(require("../config/CardConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useCardConfig = props => {
  const cardConfig = new _CardConfig.default({
    panId: props.panId,
    expiryDateId: props.expiryDateId,
    cvcId: props.cvcId
  });
  if (props.validationConfig) {
    cardConfig.validationConfig = new _CardValidationConfig.CardValidationConfig({
      acceptedCardBrands: props.validationConfig.acceptedCardBrands,
      enablePanFormatting: props.validationConfig.enablePanFormatting,
      validationListener: props.validationConfig.validationListener
    });
  }
  return cardConfig;
};
exports.useCardConfig = useCardConfig;
//# sourceMappingURL=useCardConfig.js.map