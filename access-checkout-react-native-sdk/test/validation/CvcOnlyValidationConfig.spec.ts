import CvcOnlyValidationConfig from '../../src/validation/CvcOnlyValidationConfig';

const cvcId = '123';

describe('CvcOnlyValidationConfig', () => {
  it('can only be constructed with a cvcId', () => {
    const config: CvcOnlyValidationConfig = new CvcOnlyValidationConfig({
      cvcId,
    });

    expect(config.cvcId).toEqual(cvcId);
  });
});
