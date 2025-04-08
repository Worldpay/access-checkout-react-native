import type { MerchantCvcOnlyValidationConfig } from '../validation/MerchantCvcOnlyValidationConfig';
export default class MerchantCvcOnlyConfig {
    cvcId: string;
    validationConfig?: MerchantCvcOnlyValidationConfig;
    constructor({ cvcId, validationConfig }: MerchantCvcOnlyConfig);
}
//# sourceMappingURL=MerchantCvcOnlyConfig.d.ts.map