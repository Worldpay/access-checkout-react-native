import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import CvcOnlyConfig from '../config/CvcOnlyConfig';
export interface UseCvcOnlyConfig {
    cvcId: string;
    validationConfig?: {
        validationListener: CardValidationEventListener;
    };
}
export declare function useCvcOnlyConfig({ cvcId, validationConfig, }: UseCvcOnlyConfig): CvcOnlyConfig;
