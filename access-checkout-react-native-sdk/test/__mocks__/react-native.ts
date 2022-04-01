// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { EmitterSubscription } from 'react-native';
import * as ReactNative from 'react-native';

const generateSessionsMock = jest.fn();
const initialiseCardValidationMock = jest.fn();

export const NativeModules = {
  ...ReactNative.NativeModules,
  AccessCheckoutReactNative: {
    generateSessions: generateSessionsMock,
    initialiseCardValidation: initialiseCardValidationMock,
  },
};

export const nativeEventSubscriptionMock = {
  remove: jest.fn(),
};
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const nativeEventListeners: any = {};
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const emitNativeEvent = (eventType: string, ...params: any[]): void => {
  if (!nativeEventListeners[eventType]) {
    return;
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  nativeEventListeners[eventType].forEach((listener: any) => {
    listener.apply(listener, params);
  });
};

export const NativeEventEmitter = jest.fn(() => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addListener: function (
    eventType: string,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    listener: (event: any) => void
  ): EmitterSubscription {
    // eslint-disable-next-line  prettier/prettier
    if (
      !Object.prototype.hasOwnProperty.call(nativeEventListeners, eventType)
    ) {
      nativeEventListeners[eventType] = [];
    }

    nativeEventListeners[eventType].push(listener);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
