import type { MerchantCardValidationConfig } from '../validation/MerchantCardValidationConfig';
export default class MerchantCardConfig {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    validationConfig?: MerchantCardValidationConfig;
    constructor({ panId, expiryDateId, cvcId, validationConfig }: MerchantCardConfig);
}
//# sourceMappingURL=MerchantCardConfig.d.ts.map