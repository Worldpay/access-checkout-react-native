import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RTCAccessCheckoutTextInput } from './RCTAccessCheckoutTextInput';

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
    height = 40,
    ...otherStyles
  } = StyleSheet.flatten([style]);

  // Check if other styles are remaining before assigning it to the view container this helps to prevent passing in
  // an empty object wo the view container
  const viewStyles = Object.keys(otherStyles).length ? [{
    height
  }, otherStyles] : [{
    height
  }];
  return /*#__PURE__*/React.createElement(View, {
    testID: `${testID}-view`,
    style: viewStyles
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
//# sourceMappingURL=AccessCheckoutTextInput.js.map