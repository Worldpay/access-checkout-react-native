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
interface AccessCheckoutTextInputProps extends ViewProps {
  testID: string | undefined;
  style?: StyleProp<TextStyle>;
  editable?: boolean | undefined;
  placeholder?: string | undefined;
  isValid?: boolean;
  keyboardType?: string;
}

const RTCAccessCheckoutTextInput =
  requireNativeComponent<AccessCheckoutTextInputProps>(
    'AccessCheckoutTextInput'
  );
const AccessCheckoutTextInput = (props: AccessCheckoutTextInputProps) => {
  return <RTCAccessCheckoutTextInput {...props} />;
};

export default AccessCheckoutTextInput;
