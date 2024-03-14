import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import MerchantCvcOnlyConfig from '../config/MerchantCvcOnlyConfig';
export interface CvcOnlyValidationConfig {
    validationListener: CardValidationEventListener;
}
export interface UseCvcOnlyConfig {
    cvcId: string;
    validationConfig?: CvcOnlyValidationConfig;
}
export declare function useCvcOnlyConfig({ cvcId, validationConfig }: UseCvcOnlyConfig): MerchantCvcOnlyConfig;
