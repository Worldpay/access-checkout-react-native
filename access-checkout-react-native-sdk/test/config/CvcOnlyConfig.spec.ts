import CvcOnlyConfig from '../../src/config/CvcOnlyConfig';
import { CvcValidationConfig } from '../../src/validation/CvcValidationConfig';
import type { CardValidationEventListener } from '../../src';

const cvcId = '123';

describe('CvcOnlyConfig', () => {
  describe('can be constructed', () => {
    it('with only a cvcId', () => {
      const config: CvcOnlyConfig = new CvcOnlyConfig({
        cvcId,
      });

      expect(config.cvcId).toEqual(cvcId);
      expect(config.validationConfig?.validationListener).toBeUndefined();
    });

    it('with an empty validation config object', () => {
      const config: CvcOnlyConfig = new CvcOnlyConfig({
        cvcId,
        validationConfig: {},
      });

      expect(config.cvcId).toEqual(cvcId);

      expect(config.validationConfig?.validationListener).toBeUndefined();
    });

    describe('using a validation config object', () => {
      it('with an optional validation listener', () => {
        const validationListenerMock = jest.fn() as CardValidationEventListener;
        const config: CvcOnlyConfig = new CvcOnlyConfig({
          cvcId,
          validationConfig: { validationListener: validationListenerMock },
        });

        expect(config.cvcId).toEqual(cvcId);
        expect(config.validationConfig?.validationListener).toEqual(
          validationListenerMock
        );
      });
    });
  });

  describe('using a validation config class (includes defaults)', () => {
    it('with an optional validation listener', () => {
      const validationListenerMock = jest.fn() as CardValidationEventListener;
      const validationConfig = new CvcValidationConfig({
        validationListener: validationListenerMock,
      });

      const config: CvcOnlyConfig = new CvcOnlyConfig({
        cvcId,
        validationConfig,
      });

      expect(config.cvcId).toEqual(cvcId);
      expect(config.validationConfig?.validationListener).toEqual(
        validationListenerMock
      );
    });
  });

  describe('by default', () => {
    it('has no validation configuration', () => {
      const config: CvcOnlyConfig = new CvcOnlyConfig({
        cvcId,
      });

      expect(config.validationConfig).toBeUndefined();
    });
  });
});
