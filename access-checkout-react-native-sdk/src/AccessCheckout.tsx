import { AccessCheckoutReactNative } from './index';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardDetails from './session/CardDetails';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Sessions from './session/Sessions';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardValidationConfig from './validation/CardValidationConfig';

export default class AccessCheckout {
  static CardValidationEventType = 'AccessCheckoutCardValidationEvent';

  accessBaseUrl: string;
  merchantId?: string;

  constructor({
    accessBaseUrl,
    merchantId,
  }: {
    accessBaseUrl: string;
    merchantId?: string;
  }) {
    this.accessBaseUrl = accessBaseUrl;
    this.merchantId = merchantId;
  }

  generateSessions(
    cardDetails: CardDetails,
    sessionTypes: string[]
  ): Promise<Sessions> {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.generateSessions({
        baseUrl: this.accessBaseUrl,
        merchantId: this.merchantId,
        panValue: cardDetails.pan,
        expiryDateValue: cardDetails.expiryDate,
        cvcValue: cardDetails.cvc,
        sessionTypes,
      })
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any, prettier/prettier
        .then((bridgeSessions: any) => {
          const sessions: Sessions = {};
          if (bridgeSessions.card) {
            sessions.card = bridgeSessions.card;
          }
          if (bridgeSessions.cvc) {
            sessions.cvc = bridgeSessions.cvc;
          }

          resolve(sessions);
        })
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  initialiseCardValidation(
    validationConfig: CardValidationConfig
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.initialiseCardValidation({
        baseUrl: this.accessBaseUrl,
        panId: validationConfig.panId,
        expiryDateId: validationConfig.expiryDateId,
        cvcId: validationConfig.cvcId,
        enablePanFormatting: validationConfig.enablePanFormatting,
        acceptedCardBrands: validationConfig.acceptedCardBrands,
      })
        .then(() => {
          resolve(true);
        })
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
