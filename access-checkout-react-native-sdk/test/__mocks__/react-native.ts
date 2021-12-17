import * as ReactNative from "react-native";

const generateSessionsMock = jest.fn();
const initialiseValidationMock = jest.fn();

export const NativeModules = {
  ...ReactNative.NativeModules,
  AccessCheckoutReactNative: {
    generateSessions: generateSessionsMock,
    initialiseValidation: initialiseValidationMock
  },
};

export default Object.setPrototypeOf(
  {
    NativeModules
  },
  ReactNative
);
