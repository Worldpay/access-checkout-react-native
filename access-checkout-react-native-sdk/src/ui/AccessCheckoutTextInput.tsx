import React, { useEffect, useLayoutEffect, useRef } from 'react';
import {
  type ColorValue,
  findNodeHandle,
  NativeSyntheticEvent,
  type StyleProp,
  StyleSheet,
  TextInput,
  View,
  type ViewStyle,
} from 'react-native';
import { RTCAccessCheckoutTextInput } from './RCTAccessCheckoutTextInput';
import { AccessCheckoutReactNative } from '../AccessCheckoutReactNative';
// TextInputState is an internal RN module not exported from the public API.
// Access it directly from its internal path.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TextInputState = require('react-native/Libraries/Components/TextInput/TextInputState');

/**
 * Composes `AccessCheckoutTextInput`.
 * Note: If no style.height is provided height is defaulted to make the component visible
 * - nativeID: string
 * - testID: string
 * - style: StyleProp<AccessCheckoutTextInputStyle>;
 * - placeholder: string
 * - placeholderTextColor: ColorValue
 * - editable: boolean
 */
export interface AccessCheckoutTextInputProps {
  nativeID: string;
  testID?: string;
  style?: StyleProp<AccessCheckoutTextInputStyle>;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  editable?: boolean;
}

/**
 * Note: Not all properties apply styling to both placeholder text and input text.
 *   textColor: only applies to input text.
 *   fontFamily: applies to both placeholder text and input text.
 *   fontSize: applies to both placeholder text and input text.
 *   fontStyle: applies to both placeholder text and input text.
 *   fontWeight: applies to both placeholder text and input text.
 */
export type AccessCheckoutTextInputFontStyle = 'normal' | 'italic' | undefined;
export type AccessCheckoutTextInputFontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface AccessCheckoutTextInputStyle extends ViewStyle {
  color?: ColorValue;
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: AccessCheckoutTextInputFontStyle;
  fontWeight?: AccessCheckoutTextInputFontWeight;
}

export const AccessCheckoutTextInput: React.FC<AccessCheckoutTextInputProps> = (props) => {
  const { nativeID, testID, style, placeholder, placeholderTextColor, editable } = props;

  const {
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    height = 40,
    ...otherStyles
  } = StyleSheet.flatten([style]);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const tag = findNodeHandle(ref.current);
      AccessCheckoutReactNative.registerView(tag, nativeID);
    }
  }, [nativeID]);

  useLayoutEffect(() => {
    const inputRefValue = ref.current;
    if (inputRefValue == null) {
      return;
    }

    // Makes React native aware of that our component is a text input. This enables React Native
    // to validate successfully that TextInput.State.focusTextInput()/blurTextInput() can be
    // called on our component
    TextInputState.registerInput(inputRefValue);

    return () => {
      TextInputState.unregisterInput(inputRefValue);
      if (TextInputState.currentlyFocusedInput() === inputRefValue) {
        TextInput.State.blurTextInput(inputRefValue);
      }
    };
  }, []);

  const viewStyles = Object.keys(otherStyles).length ? [{ height }, otherStyles] : [{ height }];

  const onFocusChange = (event: NativeSyntheticEvent<{ isFocused: boolean }>) => {
    if (ref.current == null) {
      return;
    }

    if (event.nativeEvent.isFocused) {
      TextInputState.focusInput(ref.current);
    } else {
      // Instructs React Native to forcibly remove the focus from our component
      // This in return sends a command to the underlying Android/iOS component
      TextInputState.blurInput(ref.current);
    }
  };

  return (
    <View testID={`${testID}-view`} style={viewStyles}>
      <RTCAccessCheckoutTextInput
        ref={ref}
        nativeID={nativeID}
        testID={testID}
        style={[{ flex: 1 }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        font={{
          fontFamily,
          fontSize,
          fontWeight,
          fontStyle,
        }}
        color={color}
        editable={editable}
        onFocusChange={onFocusChange}
      />
    </View>
  );
};

AccessCheckoutTextInput.displayName = 'AccessCheckoutTextInput';
