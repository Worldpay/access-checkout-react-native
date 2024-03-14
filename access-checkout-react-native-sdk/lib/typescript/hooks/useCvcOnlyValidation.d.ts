import { AccessCheckout, CardValidationEventListener } from '../index';
import type { CvcOnlyValidationEventListener } from '../validation/CvcOnlyValidationEventListener';
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
