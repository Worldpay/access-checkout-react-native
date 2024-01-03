import React from 'react';
import { StyleProp, TextStyle, type ViewProps } from 'react-native';
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
declare const AccessCheckoutInputText: (props: AccessCheckoutInputTextProps) => React.JSX.Element;
export default AccessCheckoutInputText;
