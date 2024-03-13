"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessCheckoutTextInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _RCTAccessCheckoutTextInput = require("./RCTAccessCheckoutTextInput");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Composes `AccessCheckoutTextInput`.
 * Note: If no style.height is provided height is defaulted to make the component visible
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
    height = 40,
    ...otherStyles
  } = _reactNative.StyleSheet.flatten([style]);

  // Check if other styles are remaining before assigning it to the view container this helps to prevent passing in
  // an empty object wo the view container
  const viewStyles = Object.keys(otherStyles).length ? [{
    height
  }, otherStyles] : [{
    height
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    testID: `${testID}-view`,
    style: viewStyles
  }, /*#__PURE__*/_react.default.createElement(_RCTAccessCheckoutTextInput.RTCAccessCheckoutTextInput, {
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
//# sourceMappingURL=AccessCheckoutTextInput.js.map