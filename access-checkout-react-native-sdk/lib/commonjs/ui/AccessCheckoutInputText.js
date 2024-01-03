"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Composes `AccessCheckoutInputText`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */

const RTCAccessCheckoutInputText = (0, _reactNative.requireNativeComponent)('AccessCheckoutInputText');
const AccessCheckoutInputText = props => {
  return /*#__PURE__*/_react.default.createElement(RTCAccessCheckoutInputText, props);
};
var _default = exports.default = AccessCheckoutInputText;
//# sourceMappingURL=AccessCheckoutInputText.js.map