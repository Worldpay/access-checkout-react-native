// @ts-ignore
import type CardDetails from "./CardDetails";
import { AccessCheckoutReactNative } from "./index";

export class AccessCheckout {
  accessBaseUrl: string;
  merchantId?: string;

  constructor({ accessBaseUrl, merchantId }: { accessBaseUrl: string, merchantId?: string }) {
    this.accessBaseUrl = accessBaseUrl;
    this.merchantId = merchantId;
  }

  // @ts-ignore
  generateSessions(cardDetails: CardDetails, sessionTypes: string[]): Promise<Map<string,string>> {
    return AccessCheckoutReactNative.generateSessions({
      baseUrl: this.accessBaseUrl,
      merchantId: this.merchantId,
      panValue: cardDetails.pan,
      expiryValue: cardDetails.expiryDate,
      cvcValue: cardDetails.cvv,
      sessionTypes,
    });
  };
}
