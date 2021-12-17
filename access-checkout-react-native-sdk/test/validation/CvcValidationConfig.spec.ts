import CvcValidationConfig from "../../src/validation/CvcOnlyValidationConfig";

const cvcId = "123";

describe("CvcValidationConfig", () => {
  it("can only be constructed with a cvcId", () => {
    const config: CvcValidationConfig = new CvcValidationConfig({
      cvcId,
    });

    expect(config.cvcId).toEqual(cvcId);
  });
});
