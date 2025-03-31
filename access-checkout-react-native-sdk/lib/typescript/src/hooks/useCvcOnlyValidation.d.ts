import type { CvcOnlyValidationEventListener } from '../validation/CvcOnlyValidationEventListener';
import AccessCheckout from '../AccessCheckout';
import type { CardValidationEventListener } from '../validation/CardValidationEventListener';
export declare const useCvcOnlyValidationEventListener: (validationListener: CvcOnlyValidationEventListener) => void;
interface UseCvcOnlyValidationHook {
    accessCheckout: AccessCheckout;
    cvcOnlyValidationConfig: {
        cvcId: string;
    };
    validationListener: CardValidationEventListener;
}
export declare const useCvcOnlyValidation: ({ accessCheckout, cvcOnlyValidationConfig, validationListener, }: UseCvcOnlyValidationHook) => {
    initialiseCvcOnlyValidation: () => Promise<boolean>;
};
export {};
