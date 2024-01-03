import React from 'react';
import { StyleProp, TextStyle, type ViewProps } from 'react-native';
/**
 * Composes `AccessCheckoutEditText`.
 *
 * - nativeID: string
 * - testID: string
 * - style: StyleProp
 * - editable: boolean
 * - placeholder: string
 */
interface AccessCheckoutEditTextProps extends ViewProps {
    testID: string | undefined;
    style?: StyleProp<TextStyle>;
    editable?: boolean | undefined;
    placeholder?: string | undefined;
    isValid?: boolean;
    keyboardType?: string;
}
declare const AccessCheckoutEditText: (props: AccessCheckoutEditTextProps) => React.JSX.Element;
export default AccessCheckoutEditText;
