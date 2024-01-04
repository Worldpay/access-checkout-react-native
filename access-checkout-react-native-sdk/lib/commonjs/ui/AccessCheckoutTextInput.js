"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Composes `AccessCheckoutTextInput`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */

const RTCAccessCheckoutTextInput = (0, _reactNative.requireNativeComponent)('AccessCheckoutTextInput');
const AccessCheckoutTextInput = props => {
  return /*#__PURE__*/_react.default.createElement(RTCAccessCheckoutTextInput, props);
};
var _default = exports.default = AccessCheckoutTextInput;
//# sourceMappingURL=AccessCheckoutTextInput.js.map