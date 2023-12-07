import React from 'react';
import { requireNativeComponent, StyleProp, TextStyle } from 'react-native';

/**
 * Composes `AccessCheckoutEditText`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */
interface AccessCheckoutEditTextProps {
  nativeID?: string | undefined;
  testID: string | undefined;
  style?: StyleProp<TextStyle>;
  editable?: boolean | undefined;
  placeholder?: string | undefined;
}

const RTCAccessCheckoutEditText = requireNativeComponent(
  'AccessCheckoutEditText'
);
const AccessCheckoutEditText = (props: AccessCheckoutEditTextProps) => {
  return <RTCAccessCheckoutEditText {...props} />;
};

export default AccessCheckoutEditText;
