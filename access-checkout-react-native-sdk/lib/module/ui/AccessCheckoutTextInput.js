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

const RTCAccessCheckoutTextInput = requireNativeComponent('AccessCheckoutTextInput');
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
      fontSize
    },
    textColor: textColor,
    editable: editable
  }));
};
export default AccessCheckoutTextInput;
//# sourceMappingURL=AccessCheckoutTextInput.js.map