import { type CvcOnlyConfig, useCvcOnlyConfig, type CardValidationEventListener } from '../../src';

describe('useCvcOnlyConfig', () => {
  it('creates card config with minimal configuration', () => {
    const CvcOnlyConfig: CvcOnlyConfig = useCvcOnlyConfig({
      cvcId: 'cvcInput',
    });

    expect(CvcOnlyConfig).toEqual({
      cvcId: 'cvcInput',
      validationConfig: undefined,
    });
  });

  describe('creates card config with card validation fields', () => {
    it('with required validationListener', () => {
      const merchantListener = jest.fn();
      const CvcOnlyConfig: CvcOnlyConfig = useCvcOnlyConfig({
        cvcId: 'cvcInput',
        validationConfig: {
          validationListener: merchantListener as CardValidationEventListener,
        },
      });

      expect(CvcOnlyConfig).toEqual({
        cvcId: 'cvcInput',
        validationConfig: {
          validationListener: merchantListener,
        },
      });
    });
  });
});
