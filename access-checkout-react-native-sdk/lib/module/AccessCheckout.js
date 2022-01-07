function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { AccessCheckoutReactNative } from './index'; // @ts-ignore

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
        expiryValue: cardDetails.expiryDate,
        cvcValue: cardDetails.cvc,
        sessionTypes
      }) // @ts-ignore
      .then(session => {
        const map = new Map();
        map.set('card', session.card);
        map.set('cvc', session.cvc);
        resolve(map);
      }).catch(error => {
        reject(error);
      });
    });
  }

  initialiseValidation(validationConfig) {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.initialiseValidation({
        baseUrl: this.accessBaseUrl,
        panId: validationConfig.panId,
        expiryId: validationConfig.expiryDateId,
        cvcId: validationConfig.cvcId,
        enablePanFormatting: validationConfig.enablePanFormatting,
        acceptedCardBrands: validationConfig.acceptedCardBrands
      }).then(() => {
        resolve(true);
      }).catch(error => {
        reject(error);
      });
    });
  }

}

_defineProperty(AccessCheckout, "ValidationEventType", 'AccessCheckoutValidationEvent');
//# sourceMappingURL=AccessCheckout.js.map