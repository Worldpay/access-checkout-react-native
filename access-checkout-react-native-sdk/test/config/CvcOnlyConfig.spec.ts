import MerchantCvcOnlyConfig from '../../src/config/MerchantCvcOnlyConfig';
import { MerchantCvcOnlyValidationConfig } from '../../src/validation/MerchantCvcOnlyValidationConfig';
import type { CardValidationEventListener } from '../../src';

const cvcId = '123';

describe('CvcOnlyConfig', () => {
  describe('can be constructed', () => {
    it('with only a cvcId', () => {
      const config: MerchantCvcOnlyConfig = new MerchantCvcOnlyConfig({
        cvcId,
      });

      expect(config.cvcId).toEqual(cvcId);
      expect(config.validationConfig?.validationListener).toBeUndefined();
    });

    it('with an empty validation config object', () => {
      const config: MerchantCvcOnlyConfig = new MerchantCvcOnlyConfig({
        cvcId,
        validationConfig: {},
      });

      expect(config.cvcId).toEqual(cvcId);

      expect(config.validationConfig?.validationListener).toBeUndefined();
    });

    describe('using a validation config object', () => {
      it('with an optional validation listener', () => {
        const validationListenerMock = jest.fn() as CardValidationEventListener;
        const config: MerchantCvcOnlyConfig = new MerchantCvcOnlyConfig({
          cvcId,
          validationConfig: { validationListener: validationListenerMock },
        });

        expect(config.cvcId).toEqual(cvcId);
        expect(config.validationConfig?.validationListener).toEqual(validationListenerMock);
      });
    });
  });

  describe('using a validation config class (includes defaults)', () => {
    it('with an optional validation listener', () => {
      const validationListenerMock = jest.fn() as CardValidationEventListener;
      const validationConfig = new MerchantCvcOnlyValidationConfig({
        validationListener: validationListenerMock,
      });

      const config: MerchantCvcOnlyConfig = new MerchantCvcOnlyConfig({
        cvcId,
        validationConfig,
      });

      expect(config.cvcId).toEqual(cvcId);
      expect(config.validationConfig?.validationListener).toEqual(validationListenerMock);
    });
  });

  describe('by default', () => {
    it('has no validation configuration', () => {
      const config: MerchantCvcOnlyConfig = new MerchantCvcOnlyConfig({
        cvcId,
      });

      expect(config.validationConfig).toBeUndefined();
    });
  });
});
