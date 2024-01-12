"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AccessCheckoutReactNative = require("./AccessCheckoutReactNative");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class AccessCheckout {
  constructor({
    baseUrl,
    merchantId
  }) {
    _defineProperty(this, "ReactNativeSdkVersion", '2.0.0');
    _defineProperty(this, "baseUrl", void 0);
    _defineProperty(this, "merchantId", void 0);
    this.baseUrl = baseUrl;
    this.merchantId = merchantId;
  }
  generateSessions(sessionGenerationConfig, sessionTypes) {
    return new Promise((resolve, reject) => {
      _AccessCheckoutReactNative.AccessCheckoutReactNative.generateSessions({
        baseUrl: this.baseUrl,
        merchantId: this.merchantId,
        panId: sessionGenerationConfig.panId,
        expiryDateId: sessionGenerationConfig.expiryDateId,
        cvcId: sessionGenerationConfig.cvcId,
        sessionTypes,
        reactNativeSdkVersion: this.ReactNativeSdkVersion
      })
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .then(bridgeSessions => {
        const sessions = {};
        if (bridgeSessions.card) {
          sessions.card = bridgeSessions.card;
        }
        if (bridgeSessions.cvc) {
          sessions.cvc = bridgeSessions.cvc;
        }
        resolve(sessions);
      })
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .catch(error => {
        reject(error);
      });
    });
  }
  initialiseCardValidation(validationConfig) {
    return new Promise((resolve, reject) => {
      _AccessCheckoutReactNative.AccessCheckoutReactNative.initialiseCardValidation({
        baseUrl: this.baseUrl,
        panId: validationConfig.panId,
        expiryDateId: validationConfig.expiryDateId,
        cvcId: validationConfig.cvcId,
        enablePanFormatting: validationConfig.enablePanFormatting,
        acceptedCardBrands: validationConfig.acceptedCardBrands
      }).then(() => {
        resolve(true);
      })
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .catch(error => {
        reject(error);
      });
    });
  }
  initialiseCvcOnlyValidation(validationConfig) {
    return new Promise((resolve, reject) => {
      _AccessCheckoutReactNative.AccessCheckoutReactNative.initialiseCvcOnlyValidation({
        cvcId: validationConfig.cvcId
      }).then(() => {
        resolve(true);
      })
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .catch(error => {
        reject(error);
      });
    });
  }
}
exports.default = AccessCheckout;
_defineProperty(AccessCheckout, "CardValidationEventType", 'AccessCheckoutCardValidationEvent');
_defineProperty(AccessCheckout, "CvcOnlyValidationEventType", 'AccessCheckoutCvcOnlyValidationEvent');
//# sourceMappingURL=AccessCheckout.js.map