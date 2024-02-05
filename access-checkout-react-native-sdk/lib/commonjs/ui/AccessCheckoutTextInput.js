"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AccessCheckoutTextInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Composes `AccessCheckoutTextInput`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp<AccessCheckoutTextInputStyle>;
 * - placeholder: string
 * - editable: boolean
 */

/**
 * Note: Not all properties apply styling to both placeholder text and input text.
 *   textColor: only applies to input text.
 *   fontFamily: applies to both placeholder text and input text.
 *   fontSize: applies to both placeholder text and input text.
 *   fontStyle: applies to both placeholder text and input text.
 *   fontWeight: applies to both placeholder text and input text.
 */

/**
 * Font Changes apply to placeholder text and input text
 *
 * ## What
 * - Rewrites font support for android
 * - Adds font weight support for android <28 only 'normal' and 'bold' supported
 * - Adds font weight support as units for android >28
 */

const RTCAccessCheckoutTextInput = (0, _reactNative.requireNativeComponent)('AccessCheckoutTextInput');
const AccessCheckoutTextInput = props => {
  const {
    nativeID,
    testID,
    style,
    placeholder,
    editable
  } = props;
  const {
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    ...otherStyles
  } = _reactNative.StyleSheet.flatten([style]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [otherStyles]
  }, /*#__PURE__*/_react.default.createElement(RTCAccessCheckoutTextInput, {
    nativeID: nativeID,
    testID: testID,
    style: [{
      flex: 1
    }],
    placeholder: placeholder,
    font: {
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle
    },
    color: color,
    editable: editable
  }));
};
exports.AccessCheckoutTextInput = AccessCheckoutTextInput;
var _default = exports.default = AccessCheckoutTextInput;
//# sourceMappingURL=AccessCheckoutTextInput.js.map