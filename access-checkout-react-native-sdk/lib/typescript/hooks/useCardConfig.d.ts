import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
import CardConfig from '../config/CardConfig';
export interface UseCardConfig {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    validationConfig?: {
        acceptedCardBrands?: string[];
        enablePanFormatting?: boolean;
        validationListener: CardValidationEventListener;
    };
}
export declare const useCardConfig: (props: UseCardConfig) => CardConfig;
