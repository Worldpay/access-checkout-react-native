import type { MerchantCardValidationConfig } from '../validation/MerchantCardValidationConfig';

export default class MerchantCardConfig {
  panId: string;
  expiryDateId: string;
  cvcId: string;
  validationConfig?: MerchantCardValidationConfig;

  constructor({ panId, expiryDateId, cvcId, validationConfig }: MerchantCardConfig) {
    this.panId = panId;
    this.expiryDateId = expiryDateId;
    this.cvcId = cvcId;
    this.validationConfig = validationConfig;
  }
}
