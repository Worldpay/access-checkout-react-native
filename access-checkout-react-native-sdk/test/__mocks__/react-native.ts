// import { EmitterSubscription } from 'react-native';
import * as ReactNative from 'react-native';

const generateSessionsMock = jest.fn();
const initialiseValidationMock = jest.fn();

export const NativeModules = {
  ...ReactNative.NativeModules,
  AccessCheckoutReactNative: {
    generateSessions: generateSessionsMock,
    initialiseValidation: initialiseValidationMock,
  },
};

export const nativeEventSubscriptionMock = {
  remove: jest.fn(),
};
const nativeEventListeners: any = {};
export const emitNativeEvent = (eventType: string, ...params: any[]): void => {
  if (!nativeEventListeners[eventType]) {
    return;
  }

  nativeEventListeners[eventType].forEach((listener: any) => {
    listener.apply(listener, params);
  });
};

export const NativeEventEmitter = jest.fn(() => ({
  // @ts-ignore
  addListener: function (
    eventType: string,
    listener: (event: any) => void
  ): EmitterSubscription {
    if (!nativeEventListeners.hasOwnProperty(eventType)) {
      nativeEventListeners[eventType] = [];
    }

    nativeEventListeners[eventType].push(listener);

    return nativeEventSubscriptionMock;
  },
}));

export default Object.setPrototypeOf(
  {
    NativeModules,
    NativeEventEmitter,
  },
  ReactNative
);
