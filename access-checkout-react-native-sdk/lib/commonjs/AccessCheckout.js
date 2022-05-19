"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccessCheckoutReactNative = require("./AccessCheckoutReactNative");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AccessCheckout {
  constructor(_ref) {
    let {
      baseUrl,
      merchantId
    } = _ref;

    _defineProperty(this, "baseUrl", void 0);

    _defineProperty(this, "merchantId", void 0);

    this.baseUrl = baseUrl;
    this.merchantId = merchantId;
  }

  generateSessions(cardDetails, sessionTypes) {
    return new Promise((resolve, reject) => {
      _AccessCheckoutReactNative.AccessCheckoutReactNative.generateSessions({
        baseUrl: this.baseUrl,
        merchantId: this.merchantId,
        panValue: cardDetails.pan,
        expiryDateValue: cardDetails.expiryDate,
        cvcValue: cardDetails.cvc,
        sessionTypes
      }) // eslint-disable-next-line  @typescript-eslint/no-explicit-any, prettier/prettier
      .then(bridgeSessions => {
        const sessions = {};

        if (bridgeSessions.card) {
          sessions.card = bridgeSessions.card;
        }

        if (bridgeSessions.cvc) {
          sessions.cvc = bridgeSessions.cvc;
        }

        resolve(sessions);
      }) // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
      }) // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
      }) // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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