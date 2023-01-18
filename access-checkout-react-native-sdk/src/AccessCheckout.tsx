import { AccessCheckoutReactNative } from './AccessCheckoutReactNative';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardDetails from './session/CardDetails';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Sessions from './session/Sessions';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CardValidationConfig from './validation/CardValidationConfig';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CvcOnlyValidationConfig from './validation/CvcOnlyValidationConfig';

export default class AccessCheckout {
  private readonly ReactNativeSdkVersion = '1.0.0';
  static readonly CardValidationEventType = 'AccessCheckoutCardValidationEvent';
  static readonly CvcOnlyValidationEventType = 'AccessCheckoutCvcOnlyValidationEvent';

  baseUrl: string;
  merchantId?: string;

  constructor({
    baseUrl,
    merchantId,
  }: {
    baseUrl: string;
    merchantId?: string;
  }) {
    this.baseUrl = baseUrl;
    this.merchantId = merchantId;
  }

  generateSessions(
    cardDetails: CardDetails,
    sessionTypes: string[]
  ): Promise<Sessions> {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.generateSessions({
        baseUrl: this.baseUrl,
        merchantId: this.merchantId,
        panValue: cardDetails.pan,
        expiryDateValue: cardDetails.expiryDate,
        cvcValue: cardDetails.cvc,
        sessionTypes,
        reactNativeSdkVersion: this.ReactNativeSdkVersion,
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
        baseUrl: this.baseUrl,
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

  initialiseCvcOnlyValidation(
    validationConfig: CvcOnlyValidationConfig
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.initialiseCvcOnlyValidation({
        cvcId: validationConfig.cvcId,
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
