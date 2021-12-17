import { NativeModules } from "react-native";
import { AccessCheckout } from "../src/";
import SessionType from "../src/session/SessionType";
import CardValidationConfig from "../src/validation/CardValidationConfig";
import {
  givenGenerateSessionsBridgeFailsWith,
  givenGenerateSessionsBridgeReturns,
  givenValidationBridgeFailsWith,
  givenValidationBridgeReturns,
  toMap,
} from "./test-utils";

const accessBaseUrl = "https://access.worldpay.com";
const merchantId = "123";
const pan = "4444";
const expiryDate = "12/34";
const cvc = "123";

const panId = "panId";
const expiryDateId = "expiryDateId";
const cvcId = "cvcId";

describe("AccessCheckout", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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

  describe("generate sessions feature", () => {
    const checkout = new AccessCheckout({ accessBaseUrl, merchantId });
    const cardDetails = { pan, expiryDate, cvc };
    const sessionTypes = [SessionType.CARD, SessionType.CVC];

    it("delegates the generation of sessions to the React Native bridge", async () => {
      givenGenerateSessionsBridgeReturns({});

      await checkout.generateSessions(cardDetails, sessionTypes);

      const bridgeMock = NativeModules.AccessCheckoutReactNative.generateSessions.mock;
      expect(bridgeMock.calls.length).toEqual(1);

      const args = bridgeMock.calls[0][0];
      expect(args).toEqual({
        baseUrl: accessBaseUrl,
        merchantId: merchantId,
        panValue: pan,
        expiryValue: expiryDate,
        cvcValue: cvc,
        sessionTypes: ["CARD", "CVC"],
      });
    });

    it("returns a resolved promise with a map of sessions when bridge successfully generates a session", async () => {
      givenGenerateSessionsBridgeReturns({ card: "card-session", cvc: "cvc-session" });

      const result = await checkout.generateSessions(cardDetails, sessionTypes);

      expect(result).toEqual(toMap({
        card: "card-session",
        cvc: "cvc-session",
      }));
    });

    it("returns a rejected promise with the error returned by the bridge when bridge fails to generate a session", async () => {
      givenGenerateSessionsBridgeFailsWith(new Error("Failed !"));

      try {
        await checkout.generateSessions(cardDetails, sessionTypes);
      } catch (error) {
        expect(error).toEqual(new Error("Failed !"));
      }
    });
  });

  describe("Card validation feature", () => {
    const checkout = new AccessCheckout({ accessBaseUrl, merchantId });
    const validationConfig = new CardValidationConfig({ panId, expiryDateId, cvcId });

    it("returns a promise with a boolean set to true when bridge successfully wires in validation", async () => {
      givenValidationBridgeReturns(true);
      const result = await checkout.initialiseValidation(validationConfig);

      expect(result).toEqual(true);
    });

    it("returns a rejected promise with the error returned by the bridge when bridge fails to wire in validation", async () => {
      givenValidationBridgeFailsWith(new Error("Failed !"));

      try {
        await checkout.initialiseValidation(validationConfig);
      } catch (error) {
        expect(error).toEqual(new Error("Failed !"));
      }
    });
  });
});
