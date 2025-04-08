"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AccessCheckoutReactNative = require("./AccessCheckoutReactNative");
class AccessCheckout {
  ReactNativeSdkVersion = '3.0.0';
  static CardValidationEventType = 'AccessCheckoutCardValidationEvent';
  static CvcOnlyValidationEventType = 'AccessCheckoutCvcOnlyValidationEvent';
  constructor({
    baseUrl,
    merchantId
  }) {
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
//# sourceMappingURL=AccessCheckout.js.map