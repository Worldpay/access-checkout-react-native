import { NativeModules } from "react-native";

export function givenGenerateSessionsReturns({card, cvv}: {card?:string, cvv?:string}) {
  const resultMap = new Map<string, string>();
  if (card) {
    resultMap.set("card", card);
  }
  if (cvv) {
    resultMap.set("cvv", cvv);
  }

  NativeModules.AccessCheckoutReactNative.generateSessions.mockReturnValueOnce(resultMap);
}

export function toMap(object: any): Map<string, string> {
  const map = new Map<string, string>();

  for (let prop in object) {
    map.set(prop, object[prop]);
  }

  return map;
}
