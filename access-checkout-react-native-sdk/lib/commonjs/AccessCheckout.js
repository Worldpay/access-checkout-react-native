"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AccessCheckoutReactNative = require("./AccessCheckoutReactNative");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class AccessCheckout {
  constructor({
    baseUrl,
    merchantId
  }) {
    _defineProperty(this, "ReactNativeSdkVersion", '3.0.0');
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