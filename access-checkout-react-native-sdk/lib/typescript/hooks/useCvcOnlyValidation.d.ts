import { AccessCheckout, CardValidationEventListener } from '../index';
import type { CvcOnlyValidationEventListener } from '../validation/CvcOnlyValidationEventListener';
export declare const useCvcOnlyValidationEventListener: (merchantListener: CvcOnlyValidationEventListener) => void;
interface UseCvcOnlyValidationHook {
    accessCheckout: AccessCheckout;
    cvcOnlyValidationConfig: {
        cvcId: string;
    };
    merchantListener: CardValidationEventListener;
}
export declare const useCvcOnlyValidation: ({ accessCheckout, cvcOnlyValidationConfig, merchantListener, }: UseCvcOnlyValidationHook) => {
    initialiseCvcOnlyValidation: () => Promise<boolean>;
};
export {};
