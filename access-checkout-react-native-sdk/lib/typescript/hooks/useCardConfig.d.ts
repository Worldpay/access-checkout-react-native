import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import { MerchantCardValidationConfig } from '../validation/MerchantCardValidationConfig';
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
    validationConfig?: MerchantCardValidationConfig;
}
export declare const useCardConfig: (props: UseCardConfig) => MerchantCardConfig;
