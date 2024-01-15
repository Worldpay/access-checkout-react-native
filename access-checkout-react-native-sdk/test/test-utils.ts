import { NativeModules } from 'react-native';

export function givenGenerateSessionsBridgeReturns({
  card,
  cvc,
}: {
  card?: string;
  cvc?: string;
}) {
  const sessions = { card, cvc };

  const mock = NativeModules.AccessCheckoutReactNative.generateSessions;
  mock.mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(sessions);
    })
  );
}

export function givenGenerateSessionsBridgeFailsWith(error: Error) {
  const mock = NativeModules.AccessCheckoutReactNative.generateSessions;
  mock.mockReturnValueOnce(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new Promise((resolve, reject) => {
      reject(error);
    })
  );
}

export function givenCardValidationBridgeReturns(returnValue: boolean) {
  const mock = NativeModules.AccessCheckoutReactNative.initialiseCardValidation;
  mock.mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(returnValue);
    })
  );
}

export function givenCardValidationBridgeFailsWith(error: Error) {
  const mock = NativeModules.AccessCheckoutReactNative.initialiseCardValidation;
  mock.mockReturnValueOnce(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new Promise((resolve, reject) => {
      reject(error);
    })
  );
}

export function givenCvcOnlyValidationBridgeReturns(returnValue: boolean) {
  const mock =
    NativeModules.AccessCheckoutReactNative.initialiseCvcOnlyValidation;
  mock.mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(returnValue);
    })
  );
}

export function givenCvcOnlyValidationBridgeFailsWith(error: Error) {
  const mock =
    NativeModules.AccessCheckoutReactNative.initialiseCvcOnlyValidation;
  mock.mockReturnValueOnce(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new Promise((resolve, reject) => {
      reject(error);
    })
  );
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isArray(variable: any) {
  return Object.prototype.toString.call(variable) === '[object Array]';
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isFunction(variable: any) {
  return Object.prototype.toString.call(variable) === '[object Function]';
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function hasProperty(object: any, propertyName: string) {
  return Object.prototype.hasOwnProperty.call(object, propertyName);
}
