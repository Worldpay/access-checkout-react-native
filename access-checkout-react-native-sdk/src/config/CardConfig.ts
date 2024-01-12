import type { CardValidationConfig } from '../validation/CardValidationConfig';

export default class CardConfig {
  panId: string;
  expiryDateId: string;
  cvcId: string;
  validationConfig?: CardValidationConfig;

  constructor({ panId, expiryDateId, cvcId, validationConfig }: CardConfig) {
    this.panId = panId;
    this.expiryDateId = expiryDateId;
    this.cvcId = cvcId;
    this.validationConfig = validationConfig;
  }
}
