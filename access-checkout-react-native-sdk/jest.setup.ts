import '@testing-library/react-native/extend-expect';
import * as ActualReactNative from 'react-native';

//Set timeout to 10s
jest.setTimeout(10000); // in milliseconds

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const mockAddListener = jest.fn(
  (_eventType: string, listener: (event: never) => void, _context?: object | undefined) => {
    return {
      listener,
      remove: jest.fn(),
      emit: (_eventType: string, ...params: never[]): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        listener.apply(listener, params);
      },
    };
  }
);

export const MockNativeEventEmitter = jest.fn(() => ({
  addListener: mockAddListener,
  remove: jest.fn(),
}));

// We also extend NativeModules with our custom AccessCheckoutReactNative
ActualReactNative.NativeModules.AccessCheckoutReactNative = {
  generateSessions: jest.fn(),
  initialiseCardValidation: jest.fn(),
  initialiseCvcOnlyValidation: jest.fn(),
};

jest.doMock('react-native', () => {
  // The NativeEventEmitter is set to read only which makes it quite difficult to deal with.
  // We replace the NativeEventEmitter with our custom implementation which provides jest function mocks that can be used to emit events and check calls
  return Object.setPrototypeOf(
    {
      NativeEventEmitter: MockNativeEventEmitter,
    },
    ActualReactNative
  );
});
