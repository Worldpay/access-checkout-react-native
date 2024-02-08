import type { MerchantCvcOnlyValidationConfig } from '../validation/MerchantCvcOnlyValidationConfig';

export default class MerchantCvcOnlyConfig {
  cvcId: string;
  validationConfig?: MerchantCvcOnlyValidationConfig;

  constructor({ cvcId, validationConfig }: MerchantCvcOnlyConfig) {
    this.cvcId = cvcId;
    this.validationConfig = validationConfig;
  }
}
