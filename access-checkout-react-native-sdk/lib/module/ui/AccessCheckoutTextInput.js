import React from 'react';
import { requireNativeComponent } from 'react-native';

/**
 * Composes `AccessCheckoutInputText`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */

const RTCAccessCheckoutTextInput = requireNativeComponent('AccessCheckoutTextInput');
const AccessCheckoutTextInput = props => {
  return /*#__PURE__*/React.createElement(RTCAccessCheckoutTextInput, props);
};
export default AccessCheckoutTextInput;
//# sourceMappingURL=AccessCheckoutTextInput.js.map