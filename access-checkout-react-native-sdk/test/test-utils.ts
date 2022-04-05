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

export function givenValidationBridgeReturns(returnValue: boolean) {
  const mock = NativeModules.AccessCheckoutReactNative.initialiseCardValidation;
  mock.mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(returnValue);
    })
  );
}

export function givenValidationBridgeFailsWith(error: Error) {
  const mock = NativeModules.AccessCheckoutReactNative.initialiseCardValidation;
  mock.mockReturnValueOnce(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new Promise((resolve, reject) => {
      reject(error);
    })
  );
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function toMap(object: any): Map<string, string> {
  const map = new Map<string, string>();

  for (const prop in object) {
    map.set(prop, object[prop]);
  }

  return map;
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function isArray(variable: any) {
  console.log(Object.prototype.toString.call(variable));
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
