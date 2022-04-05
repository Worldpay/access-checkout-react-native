function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { AccessCheckoutReactNative } from './index'; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export default class AccessCheckout {
  constructor(_ref) {
    let {
      accessBaseUrl,
      merchantId
    } = _ref;

    _defineProperty(this, "accessBaseUrl", void 0);

    _defineProperty(this, "merchantId", void 0);

    this.accessBaseUrl = accessBaseUrl;
    this.merchantId = merchantId;
  }

  generateSessions(cardDetails, sessionTypes) {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.generateSessions({
        baseUrl: this.accessBaseUrl,
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
      AccessCheckoutReactNative.initialiseCardValidation({
        baseUrl: this.accessBaseUrl,
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

}

_defineProperty(AccessCheckout, "CardValidationEventType", 'AccessCheckoutCardValidationEvent');
//# sourceMappingURL=AccessCheckout.js.map