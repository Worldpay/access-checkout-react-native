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

const RTCAccessCheckoutInputText = requireNativeComponent('AccessCheckoutInputText');
const AccessCheckoutInputText = props => {
  return /*#__PURE__*/React.createElement(RTCAccessCheckoutInputText, props);
};
export default AccessCheckoutInputText;
//# sourceMappingURL=AccessCheckoutInputText.js.map