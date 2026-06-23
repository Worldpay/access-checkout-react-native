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


// TextInputState is an internal RN module not exported from the public API.
// so we import it directly from its internal path.
// In RN 0.83+ the file uses ES module `export default`, so we need `.default`.
const textInputState = require('react-native/Libraries/Components/TextInput/TextInputState').default;

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
    // ScrollView to call blur() when the keyboard should be dismissed
    if ('registerInput' in textInputState) {
      textInputState.registerInput(inputRefValue);
    }

    return () => {
      if ('unregisterInput' in textInputState) {
        textInputState.unregisterInput(inputRefValue);
      }

      if (TextInput.State.currentlyFocusedInput() === inputRefValue) {
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
      // Updates the TextInputState state to mark this component as the text input which is currently focused
      // This in return allows ScrollViews to call blur() on this component when needed
      // Without this ScrollView would not see that our component is currently focused
      if ( 'focusInput' in textInputState ) {
        textInputState.focusInput(ref.current);
      }
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
