import React from 'react';
import { requireNativeComponent, StyleSheet, View } from 'react-native';

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

const RTCAccessCheckoutTextInput = requireNativeComponent('AccessCheckoutTextInput');
export const AccessCheckoutTextInput = props => {
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
  } = StyleSheet.flatten([style]);
  return /*#__PURE__*/React.createElement(View, {
    style: [otherStyles]
  }, /*#__PURE__*/React.createElement(RTCAccessCheckoutTextInput, {
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
export default AccessCheckoutTextInput;
//# sourceMappingURL=AccessCheckoutTextInput.js.map