import React from 'react';
import {
  requireNativeComponent,
  StyleProp,
  TextStyle,
  type ViewProps,
} from 'react-native';

/**
 * Composes `AccessCheckoutInputText`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */
interface AccessCheckoutInputTextProps extends ViewProps {
  testID: string | undefined;
  style?: StyleProp<TextStyle>;
  editable?: boolean | undefined;
  placeholder?: string | undefined;
  isValid?: boolean;
  keyboardType?: string;
}

const RTCAccessCheckoutInputText =
  requireNativeComponent<AccessCheckoutInputTextProps>(
    'AccessCheckoutInputText'
  );
const AccessCheckoutInputText = (props: AccessCheckoutInputTextProps) => {
  return <RTCAccessCheckoutInputText {...props} />;
};

export default AccessCheckoutInputText;
