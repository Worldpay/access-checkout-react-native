import { AccessCheckoutReactNative } from './AccessCheckoutReactNative';
import type SessionGenerationConfig from './session/SessionGenerationConfig';
import type Sessions from './session/Sessions';

interface InitialiseCardValidationConfig {
  panId: string;
  expiryDateId: string;
  cvcId: string;
  enablePanFormatting?: boolean;
  acceptedCardBrands?: string[];
}
interface InitialiseCvcOnlyValidationConfig {
  cvcId: string;
}
export default class AccessCheckout {
  private readonly ReactNativeSdkVersion = '3.0.0';
  static readonly CardValidationEventType = 'AccessCheckoutCardValidationEvent';
  static readonly CvcOnlyValidationEventType = 'AccessCheckoutCvcOnlyValidationEvent';

  baseUrl: string;
  merchantId?: string;

  constructor({ baseUrl, merchantId }: { baseUrl: string; merchantId?: string }) {
    this.baseUrl = baseUrl;
    this.merchantId = merchantId;
  }

  generateSessions(sessionGenerationConfig: SessionGenerationConfig, sessionTypes: string[]): Promise<Sessions> {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.generateSessions({
        baseUrl: this.baseUrl,
        merchantId: this.merchantId,
        panId: sessionGenerationConfig.panId,
        expiryDateId: sessionGenerationConfig.expiryDateId,
        cvcId: sessionGenerationConfig.cvcId,
        sessionTypes,
        reactNativeSdkVersion: this.ReactNativeSdkVersion,
      })
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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

  initialiseCardValidation(validationConfig: InitialiseCardValidationConfig): Promise<boolean> {
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

  initialiseCvcOnlyValidation(validationConfig: InitialiseCvcOnlyValidationConfig): Promise<boolean> {
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
