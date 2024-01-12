import AccessCheckout from '../AccessCheckout';
import { CardValidationEventListener } from '../validation/CardValidationEventListener';
export declare function useCardValidationEventListener(merchantListener: CardValidationEventListener): void;
interface UseCardValidationHook {
    accessCheckout: AccessCheckout;
    cardValidationConfig: {
        panId: string;
        expiryDateId: string;
        cvcId: string;
        enablePanFormatting?: boolean;
        acceptedCardBrands?: string[];
    };
    merchantListener: CardValidationEventListener;
}
export declare function useCardValidation({ accessCheckout, cardValidationConfig, merchantListener, }: UseCardValidationHook): {
    initialiseCardValidation: () => Promise<boolean>;
};
export {};
