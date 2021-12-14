import * as ReactNative from "react-native";

const genSessionsMock = jest.fn();

export const NativeModules = {
  ...ReactNative.NativeModules,
  AccessCheckoutReactNative: {
    generateSessions: genSessionsMock
  },
};

export default Object.setPrototypeOf(
  {
    NativeModules
  },
  ReactNative
);
