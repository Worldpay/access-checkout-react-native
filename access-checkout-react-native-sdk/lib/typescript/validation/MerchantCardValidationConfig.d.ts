import type { CardValidationEventListener } from '../index';
export declare class MerchantCardValidationConfig {
    enablePanFormatting?: boolean;
    acceptedCardBrands?: string[];
    validationListener?: CardValidationEventListener;
    constructor({ validationListener, enablePanFormatting, acceptedCardBrands, }: MerchantCardValidationConfig);
}
//# sourceMappingURL=MerchantCardValidationConfig.d.ts.map