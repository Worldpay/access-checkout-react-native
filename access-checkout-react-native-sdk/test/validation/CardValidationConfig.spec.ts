import CardValidationConfig from '../../src/validation/CardValidationConfig';

const panId = '4444';
const expiryDateId = '12/21';
const cvcId = '123';

describe('CardValidationConfig', () => {
  describe('can be constructed', () => {
    it('with only a panId, an expiryDateId and a cvcId', () => {
      const config: CardValidationConfig = new CardValidationConfig({
        panId,
        expiryDateId,
        cvcId,
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);
    });

    it('with an optional flag to enable card number formatting', () => {
      const config: CardValidationConfig = new CardValidationConfig({
        panId,
        expiryDateId,
        cvcId,
        enablePanFormatting: true,
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);
      expect(config.enablePanFormatting).toEqual(true);
    });

    it('with an optional list of card brands to restrict validation to', () => {
      const config: CardValidationConfig = new CardValidationConfig({
        panId,
        expiryDateId,
        cvcId,
        acceptedCardBrands: ['visa', 'mastercard'],
      });

      expect(config.panId).toEqual(panId);
      expect(config.expiryDateId).toEqual(expiryDateId);
      expect(config.cvcId).toEqual(cvcId);
      expect(config.acceptedCardBrands).toEqual(['visa', 'mastercard']);
    });
  });

  describe('by default', () => {
    it('has card number formatting disabled', () => {
      const config: CardValidationConfig = new CardValidationConfig({
        panId,
        expiryDateId,
        cvcId,
      });

      expect(config.enablePanFormatting).toEqual(false);
    });

    it('accepts all card brands', () => {
      const config: CardValidationConfig = new CardValidationConfig({
        panId,
        expiryDateId,
        cvcId,
      });

      expect(config.acceptedCardBrands).toEqual([]);
    });
  });
});
