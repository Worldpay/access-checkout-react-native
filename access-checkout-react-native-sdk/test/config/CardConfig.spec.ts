import MerchantCardConfig from '../../src/config/MerchantCardConfig';
import { MerchantCardValidationConfig } from '../../src/validation/MerchantCardValidationConfig';
import type { CardValidationEventListener } from '../../src';

const panId = '4444';
const expiryDateId = '12/21';
const cvcId = '123';

describe('CardConfig', () => {
  describe('can be constructed', () => {
    it('with only a panId, an expiryDateId and a cvcId', () => {
      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);

      expect(config.validationConfig?.enablePanFormatting).toBeUndefined();
      expect(config.validationConfig?.acceptedCardBrands).toBeUndefined();
    });

    it('with an empty validation config object', () => {
      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
        validationConfig: {},
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);

      expect(config.validationConfig?.enablePanFormatting).toBeUndefined();
      expect(config.validationConfig?.acceptedCardBrands).toBeUndefined();
    });

    describe('using a validation config object', () => {
      it('with an optional validation config flag to enable card number formatting', () => {
        const config: MerchantCardConfig = new MerchantCardConfig({
          panId,
          expiryDateId,
          cvcId,
          validationConfig: { enablePanFormatting: true },
        });

        expect(config.panId).toEqual(panId);
        expect(config.expiryDateId).toEqual(expiryDateId);
        expect(config.cvcId).toEqual(cvcId);
        expect(config.validationConfig?.enablePanFormatting).toEqual(true);
        expect(config.validationConfig?.acceptedCardBrands).toBeUndefined();
        expect(config.validationConfig?.validationListener).toBeUndefined();
      });

      it('with an optional list of card brands to restrict validation to', () => {
        const config: MerchantCardConfig = new MerchantCardConfig({
          panId,
          expiryDateId,
          cvcId,
          validationConfig: { acceptedCardBrands: ['visa', 'mastercard'] },
        });

        expect(config.panId).toEqual(panId);
        expect(config.expiryDateId).toEqual(expiryDateId);
        expect(config.cvcId).toEqual(cvcId);
        expect(config.validationConfig?.acceptedCardBrands).toEqual(['visa', 'mastercard']);
        expect(config.validationConfig?.enablePanFormatting).toBeUndefined();
        expect(config.validationConfig?.validationListener).toBeUndefined();
      });

      it('with an optional validation listener', () => {
        const validationListenerMock = jest.fn() as CardValidationEventListener;
        const config: MerchantCardConfig = new MerchantCardConfig({
          panId,
          expiryDateId,
          cvcId,
          validationConfig: { validationListener: validationListenerMock },
        });

        expect(config.panId).toEqual(panId);
        expect(config.expiryDateId).toEqual(expiryDateId);
        expect(config.cvcId).toEqual(cvcId);
        expect(config.validationConfig?.acceptedCardBrands).toBeUndefined();
        expect(config.validationConfig?.enablePanFormatting).toBeUndefined();
        expect(config.validationConfig?.validationListener).toEqual(validationListenerMock);
      });
    });
  });

  describe('using a validation config class (includes defaults)', () => {
    it('with an optional validation config flag to enable card number formatting', () => {
      const validationConfig = new MerchantCardValidationConfig({
        enablePanFormatting: true,
      });

      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
        validationConfig,
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);
      expect(config.validationConfig?.enablePanFormatting).toEqual(true);
      expect(config.validationConfig?.acceptedCardBrands).toEqual([]);
      expect(config.validationConfig?.validationListener).toBeUndefined();
    });

    it('with an optional list of card brands to restrict validation to', () => {
      const validationConfig = new MerchantCardValidationConfig({
        acceptedCardBrands: ['visa', 'mastercard'],
      });

      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
        validationConfig,
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);
      expect(config.validationConfig?.acceptedCardBrands).toEqual(['visa', 'mastercard']);
      expect(config.validationConfig?.enablePanFormatting).toEqual(false);
      expect(config.validationConfig?.validationListener).toBeUndefined();
    });

    it('with an optional validation listener', () => {
      const validationListenerMock = jest.fn() as CardValidationEventListener;
      const validationConfig = new MerchantCardValidationConfig({
        validationListener: validationListenerMock,
      });

      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
        validationConfig,
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);
      expect(config.validationConfig?.acceptedCardBrands).toEqual([]);
      expect(config.validationConfig?.enablePanFormatting).toEqual(false);
      expect(config.validationConfig?.validationListener).toEqual(validationListenerMock);
    });
  });

  describe('by default', () => {
    it('has no validation configuration', () => {
      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
      });

      expect(config.validationConfig).toBeUndefined();
    });

    it('has card number formatting disabled', () => {
      const validationConfig = new MerchantCardValidationConfig({});
      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
        validationConfig,
      });

      expect(config.validationConfig?.enablePanFormatting).toEqual(false);
    });

    it('accepts all card brands', () => {
      const validationConfig = new MerchantCardValidationConfig({});
      const config: MerchantCardConfig = new MerchantCardConfig({
        panId,
        expiryDateId,
        cvcId,
        validationConfig,
      });

      expect(config.validationConfig?.acceptedCardBrands).toEqual([]);
    });
  });
});
