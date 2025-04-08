import AccessCheckout from '../AccessCheckout';
import { CardValidationEventListener } from '../validation/CardValidationEventListener';
export declare function useCardValidationEventListener(validationListener: CardValidationEventListener): void;
interface UseCardValidationHook {
    accessCheckout: AccessCheckout;
    cardValidationConfig: {
        panId: string;
        expiryDateId: string;
        cvcId: string;
        enablePanFormatting?: boolean;
        acceptedCardBrands?: string[];
    };
    validationListener: CardValidationEventListener;
}
export declare function useCardValidation({ accessCheckout, cardValidationConfig, validationListener }: UseCardValidationHook): {
    initialiseCardValidation: () => Promise<boolean>;
};
export {};
//# sourceMappingURL=useCardValidation.d.ts.map