import { type CardConfig, useCardConfig, type CardValidationEventListener } from '../../src';

describe('useCardConfig', () => {
  it('creates card config with minimal configuration', () => {
    const cardConfig: CardConfig = useCardConfig({
      panId: 'panID',
      expiryDateId: 'expiryDateId',
      cvcId: 'cvcInput',
    });

    expect(cardConfig).toEqual({
      cvcId: 'cvcInput',
      expiryDateId: 'expiryDateId',
      panId: 'panID',
      validationConfig: undefined,
    });
  });

  describe('creates card config with card validation fields', () => {
    it('with required validationListener', () => {
      const merchantListener = jest.fn();
      const cardConfig: CardConfig = useCardConfig({
        panId: 'panID',
        expiryDateId: 'expiryDateId',
        cvcId: 'cvcInput',
        validationConfig: {
          validationListener: merchantListener as CardValidationEventListener,
        },
      });

      expect(cardConfig).toEqual({
        cvcId: 'cvcInput',
        expiryDateId: 'expiryDateId',
        panId: 'panID',
        validationConfig: {
          acceptedCardBrands: [],
          enablePanFormatting: false,
          validationListener: merchantListener,
        },
      });
    });

    it('with optional acceptedCardBrands', () => {
      const merchantListener = jest.fn();
      const cardConfig: CardConfig = useCardConfig({
        panId: 'panID',
        expiryDateId: 'expiryDateId',
        cvcId: 'cvcInput',
        validationConfig: {
          acceptedCardBrands: ['visa', 'mastercard'],
          validationListener: merchantListener as CardValidationEventListener,
        },
      });

      expect(cardConfig).toEqual({
        cvcId: 'cvcInput',
        expiryDateId: 'expiryDateId',
        panId: 'panID',
        validationConfig: {
          acceptedCardBrands: ['visa', 'mastercard'],
          enablePanFormatting: false,
          validationListener: merchantListener,
        },
      });
    });

    it('with optional enablePanFormatting', () => {
      const merchantListener = jest.fn();
      const cardConfig: CardConfig = useCardConfig({
        panId: 'panID',
        expiryDateId: 'expiryDateId',
        cvcId: 'cvcInput',
        validationConfig: {
          enablePanFormatting: true,
          validationListener: merchantListener as CardValidationEventListener,
        },
      });

      expect(cardConfig).toEqual({
        cvcId: 'cvcInput',
        expiryDateId: 'expiryDateId',
        panId: 'panID',
        validationConfig: {
          acceptedCardBrands: [],
          enablePanFormatting: true,
          validationListener: merchantListener,
        },
      });
    });

    it('with all options', () => {
      const merchantListener = jest.fn();
      const cardConfig: CardConfig = useCardConfig({
        panId: 'panID',
        expiryDateId: 'expiryDateId',
        cvcId: 'cvcInput',
        validationConfig: {
          acceptedCardBrands: ['visa', 'mastercard'],
          enablePanFormatting: true,
          validationListener: merchantListener as CardValidationEventListener,
        },
      });

      expect(cardConfig).toEqual({
        cvcId: 'cvcInput',
        expiryDateId: 'expiryDateId',
        panId: 'panID',
        validationConfig: {
          acceptedCardBrands: ['visa', 'mastercard'],
          enablePanFormatting: true,
          validationListener: merchantListener,
        },
      });
    });
  });
});
