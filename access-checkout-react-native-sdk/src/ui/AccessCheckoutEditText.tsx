import React, { useEffect } from "react";
import { NativeEventEmitter, requireNativeComponent, TextInputProps } from "react-native";
import { AccessCheckoutReactNative } from "../AccessCheckoutReactNative";

/**
 * Composes `AccessCheckoutEditText`.
 *
 * - text: string
 */
interface AccessCheckoutEditTextProps extends TextInputProps {
  customOnChange: (event: any) => void;
}

const RTCAccessCheckoutEditText = requireNativeComponent(
  "AccessCheckoutEditText"
);
const AccessCheckoutEditText = (props: AccessCheckoutEditTextProps) => {
  useEffect(() => {
    const emitter = new NativeEventEmitter(AccessCheckoutReactNative);
    emitter.addListener("AccessCheckoutEditTextChange", event => {
      console.log("Text changed", event);
    });
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <RTCAccessCheckoutEditText {...props} />;
};

export default AccessCheckoutEditText;
