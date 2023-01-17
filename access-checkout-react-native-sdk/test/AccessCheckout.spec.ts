import * as fs from 'fs';
import { NativeModules } from 'react-native';
import CvcOnlyValidationConfig from '../src/validation/CvcOnlyValidationConfig';
import { AccessCheckout, CVC } from '../src/';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Sessions from '../src/session/Sessions';
import SessionType from '../src/session/SessionType';
import CardValidationConfig from '../src/validation/CardValidationConfig';
import {
  givenGenerateSessionsBridgeFailsWith,
  givenGenerateSessionsBridgeReturns,
  givenCardValidationBridgeFailsWith,
  givenCardValidationBridgeReturns,
  givenCvcOnlyValidationBridgeFailsWith,
  givenCvcOnlyValidationBridgeReturns,
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageDotJson = JSON.parse(
  fs.readFileSync('./package.json', { encoding: 'utf8' })
);

describe('AccessCheckout', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('can be constructed', () => {
    it('by passing just a baseUrl', () => {
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

    describe('independently of the type of session', () => {
      const cardDetails = { pan, expiryDate, cvc };
      const sessionTypes = [SessionType.CARD, SessionType.CVC];

      it('passes the SDK version to the React Native bridge', async () => {
        givenGenerateSessionsBridgeReturns({});

        await checkout.generateSessions(cardDetails, sessionTypes);

        const bridgeMock =
          NativeModules.AccessCheckoutReactNative.generateSessions.mock;
        expect(bridgeMock.calls.length).toEqual(1);

        const args = bridgeMock.calls[0][0];
        expect(args.reactNativeSdkVersion).toEqual(packageDotJson.version);
      });

      it('returns a rejected promise with the error returned by the bridge when bridge fails to generate a session', async () => {
        givenGenerateSessionsBridgeFailsWith(new Error('Failed !'));

        try {
          await checkout.generateSessions(cardDetails, sessionTypes);
        } catch (error) {
          expect(error).toEqual(new Error('Failed !'));
        }
      });
    });

    describe('for card only', () => {
      const cardDetails = { pan, expiryDate, cvc };
      const sessionTypes = [SessionType.CARD];

      it('returns a resolved promise with a sessions object containing only a card session when bridge successfully generates a session', async () => {
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
    });

    describe('for card and cvc', () => {
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
          reactNativeSdkVersion: packageDotJson.version,
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
    });

    describe('for cvc only', () => {
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
          reactNativeSdkVersion: packageDotJson.version,
        });
      });

      it('returns a resolved promise with a sessions object containing only a cvc session when bridge successfully generates only a cvc session', async () => {
        givenGenerateSessionsBridgeReturns({
          cvc: 'cvc-session',
        });

        const result: Sessions = await checkout.generateSessions(
          cardDetails,
          sessionType
        );

        expect(hasProperty(result, 'card')).toEqual(false);
        expect(result).toEqual({
          cvc: 'cvc-session',
        });
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
      givenCardValidationBridgeReturns(true);
      const result = await checkout.initialiseCardValidation(validationConfig);

      expect(result).toEqual(true);
    });

    it('returns a rejected promise with the error returned by the bridge when bridge fails to wire in validation', async () => {
      givenCardValidationBridgeFailsWith(new Error('Failed !'));

      try {
        await checkout.initialiseCardValidation(validationConfig);
      } catch (error) {
        expect(error).toEqual(new Error('Failed !'));
      }
    });
  });

  describe('Cvc validation feature', () => {
    const checkout = new AccessCheckout({ baseUrl, merchantId });
    const validationConfig = new CvcOnlyValidationConfig({
      cvcId,
    });

    it('returns a promise with a boolean set to true when bridge successfully wires in validation', async () => {
      givenCvcOnlyValidationBridgeReturns(true);
      const result = await checkout.initialiseCvcOnlyValidation(
        validationConfig
      );

      expect(result).toEqual(true);
    });

    it('returns a rejected promise with the error returned by the bridge when bridge fails to wire in validation', async () => {
      givenCvcOnlyValidationBridgeFailsWith(new Error('Failed !'));

      try {
        await checkout.initialiseCvcOnlyValidation(validationConfig);
      } catch (error) {
        expect(error).toEqual(new Error('Failed !'));
      }
    });
  });
});
