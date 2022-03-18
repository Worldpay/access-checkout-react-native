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
    // @ts-ignore
    new Promise((resolve, reject) => {
      reject(error);
    })
  );
}

export function givenValidationBridgeReturns(returnValue: boolean) {
  const mock = NativeModules.AccessCheckoutReactNative.initialiseValidation;
  mock.mockReturnValueOnce(
    new Promise((resolve) => {
      resolve(returnValue);
    })
  );
}

export function givenValidationBridgeFailsWith(error: Error) {
  const mock = NativeModules.AccessCheckoutReactNative.initialiseValidation;
  mock.mockReturnValueOnce(
    // @ts-ignore
    new Promise((resolve, reject) => {
      reject(error);
    })
  );
}

export function toMap(object: any): Map<string, string> {
  const map = new Map<string, string>();

  for (let prop in object) {
    map.set(prop, object[prop]);
  }

  return map;
}

export function isArray(variable: any) {
  console.log(Object.prototype.toString.call(variable));
  return Object.prototype.toString.call(variable) === '[object Array]';
}

export function isFunction(variable: any) {
  return Object.prototype.toString.call(variable) === '[object Function]';
}
