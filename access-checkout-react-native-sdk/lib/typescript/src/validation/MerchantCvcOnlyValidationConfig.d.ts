import type { CardValidationEventListener } from '../index';
export declare class MerchantCvcOnlyValidationConfig {
    validationListener?: CardValidationEventListener;
    constructor({ validationListener }: MerchantCvcOnlyValidationConfig);
}
