import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import MerchantCardConfig from '../config/MerchantCardConfig';
export interface CardValidationConfig {
    acceptedCardBrands?: string[];
    enablePanFormatting?: boolean;
    validationListener: CardValidationEventListener;
}
export interface UseCardConfig {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    validationConfig?: CardValidationConfig;
}
export declare const useCardConfig: (props: UseCardConfig) => MerchantCardConfig;
//# sourceMappingURL=useCardConfig.d.ts.map