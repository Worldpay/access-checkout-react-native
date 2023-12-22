import React from 'react';
import { requireNativeComponent } from 'react-native';

/**
 * Composes `AccessCheckoutEditText`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */

const RTCAccessCheckoutEditText = requireNativeComponent('AccessCheckoutEditText');
const AccessCheckoutEditText = props => {
  return /*#__PURE__*/React.createElement(RTCAccessCheckoutEditText, props);
};
export default AccessCheckoutEditText;
//# sourceMappingURL=AccessCheckoutEditText.js.map