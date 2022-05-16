import { NativeModules } from 'react-native';
import { AccessCheckout, CVC } from '../src/';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Sessions from '../src/session/Sessions';
import SessionType from '../src/session/SessionType';
import CardValidationConfig from '../src/validation/CardValidationConfig';
import {
  givenGenerateSessionsBridgeFailsWith,
  givenGenerateSessionsBridgeReturns,
  givenValidationBridgeFailsWith,
  givenValidationBridgeReturns,
  hasProperty,
} from './test-utils';

const baseUrl = 'https://access.worldpay.com';
const merchantId = '123';
const pan = '4444';
const expiryDate = '12/34';
const cvc = '123';

const panId = 'panId';
const expiryDateId = 'expiryDateId';
const cvcId = 'cvcId';

describe('AccessCheckout', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('can be constructed', () => {
    it('by passing just an baseUrl', () => {
      const checkout = new AccessCheckout({ baseUrl });

      expect(checkout).toBeDefined();
    });

    it('by passing an baseUrl and a merchantId', () => {
      const checkout = new AccessCheckout({ baseUrl, merchantId });

      expect(checkout).toBeDefined();
    });

    it('by passing parameters in any order', () => {
      expect(new AccessCheckout({ baseUrl, merchantId })).toBeDefined();
      expect(new AccessCheckout({ merchantId, baseUrl })).toBeDefined();
    });
  });

  describe('generate sessions feature', () => {
    const checkout = new AccessCheckout({ baseUrl, merchantId });
    const cardDetails = { pan, expiryDate, cvc };
    const sessionTypes = [SessionType.CARD, SessionType.CVC];

    it('delegates the generation of sessions to the React Native bridge', async () => {
      givenGenerateSessionsBridgeReturns({});

      await checkout.generateSessions(cardDetails, sessionTypes);

      const bridgeMock =
        NativeModules.AccessCheckoutReactNative.generateSessions.mock;
      expect(bridgeMock.calls.length).toEqual(1);

      const args = bridgeMock.calls[0][0];
      expect(args).toEqual({
        baseUrl,
        merchantId,
        panValue: pan,
        expiryDateValue: expiryDate,
        cvcValue: cvc,
        sessionTypes: ['CARD', 'CVC'],
      });
    });

    it('returns a resolved promise with a sessions object containing only a card session when bridge successfully generates only a card session', async () => {
      givenGenerateSessionsBridgeReturns({
        card: 'card-session',
      });

      const result: Sessions = await checkout.generateSessions(
        cardDetails,
        sessionTypes
      );

      expect(hasProperty(result, 'cvc')).toEqual(false);
      expect(result).toEqual({
        card: 'card-session',
      });
    });

    it('returns a resolved promise with a sessions object containing both a card session and a cvc session when bridge successfully generates both sessions', async () => {
      givenGenerateSessionsBridgeReturns({
        card: 'card-session',
        cvc: 'cvc-session',
      });

      const result: Sessions = await checkout.generateSessions(
        cardDetails,
        sessionTypes
      );

      expect(result).toEqual({
        card: 'card-session',
        cvc: 'cvc-session',
      });
    });

    it('returns a resolved promise with a sessions object containing only a cvc session when bridge successfully generates only a cvc session', async () => {
      givenGenerateSessionsBridgeReturns({
        cvc: 'cvc-session',
      });

      const result: Sessions = await checkout.generateSessions(
        cardDetails,
        sessionTypes
      );

      expect(hasProperty(result, 'card')).toEqual(false);
      expect(result).toEqual({
        cvc: 'cvc-session',
      });
    });

    it('returns a rejected promise with the error returned by the bridge when bridge fails to generate a session', async () => {
      givenGenerateSessionsBridgeFailsWith(new Error('Failed !'));

      try {
        await checkout.generateSessions(cardDetails, sessionTypes);
      } catch (error) {
        expect(error).toEqual(new Error('Failed !'));
      }
    });

    describe('generate cvc session feature', () => {
      const checkout = new AccessCheckout({ baseUrl, merchantId });
      const cardDetails = { cvc };
      const sessionType = [CVC];

      it('delegates the generation of a cvc session to the React Native bridge', async () => {
        givenGenerateSessionsBridgeReturns({});

        await checkout.generateSessions(cardDetails, sessionType);

        const bridgeMock =
          NativeModules.AccessCheckoutReactNative.generateSessions.mock;
        expect(bridgeMock.calls.length).toEqual(1);

        const args = bridgeMock.calls[0][0];

        expect(args).toEqual({
          baseUrl,
          merchantId,
          cvcValue: cvc,
          sessionTypes: ['CVC'],
        });
      });

      it('returns a rejected promise with the error returned by the bridge when bridge fails to generate a cvc session', async () => {
        givenGenerateSessionsBridgeFailsWith(new Error('Failed !'));

        try {
          await checkout.generateSessions(cardDetails, sessionType);
        } catch (error) {
          expect(error).toEqual(new Error('Failed !'));
        }
      });
    });
  });

  describe('Card validation feature', () => {
    const checkout = new AccessCheckout({ baseUrl, merchantId });
    const validationConfig = new CardValidationConfig({
      panId,
      expiryDateId,
      cvcId,
    });

    it('returns a promise with a boolean set to true when bridge successfully wires in validation', async () => {
      givenValidationBridgeReturns(true);
      const result = await checkout.initialiseCardValidation(validationConfig);

      expect(result).toEqual(true);
    });

    it('returns a rejected promise with the error returned by the bridge when bridge fails to wire in validation', async () => {
      givenValidationBridgeFailsWith(new Error('Failed !'));

      try {
        await checkout.initialiseCardValidation(validationConfig);
      } catch (error) {
        expect(error).toEqual(new Error('Failed !'));
      }
    });
  });
});
