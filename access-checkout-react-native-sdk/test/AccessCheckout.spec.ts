import { NativeModules } from "react-native";
import { AccessCheckout } from "../src/AccessCheckout";
import { givenGenerateSessionsReturns, toMap } from "./utils/test-utils";

const accessBaseUrl = "https://access.worldpay.com";
const merchantId = "123";
const pan = "4444";
const expiryDate = "12/34";
const cvv = "123";

describe("AccessCheckout", () => {
  describe("can be constructed", () => {
    it("by passing just an accessBaseUrl", () => {
      const checkout = new AccessCheckout({ accessBaseUrl });

      expect(checkout).toBeDefined();
    });

    it("by passing an accessBaseUrl and a merchantId", () => {
      const checkout = new AccessCheckout({ accessBaseUrl, merchantId });

      expect(checkout).toBeDefined();
    });

    it("by passing parameters in any order", () => {
      expect(new AccessCheckout({ accessBaseUrl, merchantId })).toBeDefined();
      expect(new AccessCheckout({ merchantId, accessBaseUrl })).toBeDefined();
    });
  });

  it("should support generating a card session", async () => {
    const checkout = new AccessCheckout({ accessBaseUrl, merchantId });
    const cardDetails = {
      pan,
      expiryDate,
      cvv,
    };
    givenGenerateSessionsReturns({ card: "link-to-session" });

    const result = await checkout.generateSessions(cardDetails, ["CARD"]);

    expect(result).toEqual(toMap({ card: "link-to-session" }));

    const generateSessionMock = NativeModules.AccessCheckoutReactNative.generateSessions.mock;
    expect(generateSessionMock.calls.length).toEqual(1);

    const args = generateSessionMock.calls[0][0];
    expect(args).toEqual({
      baseUrl:accessBaseUrl,
      merchantId: merchantId,
      panValue:pan,
      expiryValue:expiryDate,
      cvcValue:cvv,
      sessionTypes: ['CARD']
    });
  });
});
