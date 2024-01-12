import type { CardValidationConfig } from '../validation/CardValidationConfig';
export default class CardConfig {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    validationConfig?: CardValidationConfig;
    constructor({ panId, expiryDateId, cvcId, validationConfig }: CardConfig);
}
