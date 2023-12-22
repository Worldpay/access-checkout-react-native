"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Composes `AccessCheckoutEditText`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */

const RTCAccessCheckoutEditText = (0, _reactNative.requireNativeComponent)('AccessCheckoutEditText');
const AccessCheckoutEditText = props => {
  return /*#__PURE__*/_react.default.createElement(RTCAccessCheckoutEditText, props);
};
var _default = exports.default = AccessCheckoutEditText;
//# sourceMappingURL=AccessCheckoutEditText.js.map