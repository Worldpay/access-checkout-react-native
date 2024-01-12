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
 * - style: StyleProp<AccessCheckoutTextInputStyle>;
 * - placeholder: string
 * - editable: boolean
 */

/**
 * Note: Not all properties apply styling to placeholder text and input text.
 *   textColor: only applies to input text.
 *   fontFamily: applies to both placeholder text and input text.
 *   fontSize:applies to both placeholder text and input text.
 *   fontStyle:applies to both placeholder text and input text.
 *   fontWeight:applies to both placeholder text and input text.
 */

/**
 * Font Changes apply to placeholder text and input text
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
    textColor,
    fontFamily,
    fontSize,
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
      fontSize
    },
    textColor: textColor,
    editable: editable
  }));
};
var _default = exports.default = AccessCheckoutTextInput;
//# sourceMappingURL=AccessCheckoutTextInput.js.map