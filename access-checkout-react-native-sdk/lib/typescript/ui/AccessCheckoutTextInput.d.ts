import React from 'react';
import { StyleProp, TextStyle, type ViewProps } from 'react-native';
/**
 * Composes `AccessCheckoutTextInput`.
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
declare const AccessCheckoutTextInput: (props: AccessCheckoutTextInputProps) => React.JSX.Element;
export default AccessCheckoutTextInput;
