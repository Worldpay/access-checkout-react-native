import { AccessCheckoutReactNative } from "./index";
// @ts-ignore
import { CardDetails } from "./session/CardDetails";
// @ts-ignore
import CardValidationConfig from "./validation/CardValidationConfig";

export default class AccessCheckout {
  static ValidationEventType = "AccessCheckoutValidationEvent";

  accessBaseUrl: string;
  merchantId?: string;

  constructor({ accessBaseUrl, merchantId }: { accessBaseUrl: string, merchantId?: string }) {
    this.accessBaseUrl = accessBaseUrl;
    this.merchantId = merchantId;
  }

  generateSessions(cardDetails: CardDetails, sessionTypes: string[]): Promise<Map<string, string>> {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.generateSessions({
        baseUrl: this.accessBaseUrl,
        merchantId: this.merchantId,
        panValue: cardDetails.pan,
        expiryValue: cardDetails.expiryDate,
        cvcValue: cardDetails.cvc,
        sessionTypes,
      })
        // @ts-ignore
        .then(session => {
          const map = new Map<string, string>();
          map.set("card", session.card);
          map.set("cvc", session.cvc);

          resolve(map);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  initialiseValidation(validationConfig: CardValidationConfig): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AccessCheckoutReactNative.initialiseValidation({
        baseUrl: this.accessBaseUrl,
        panId: validationConfig.panId,
        expiryId: validationConfig.expiryDateId,
        cvcId: validationConfig.cvcId,
        enablePanFormatting: validationConfig.enablePanFormatting,
        acceptedCardBrands: validationConfig.acceptedCardBrands,
      })
        .then(() => {
          resolve(true);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
