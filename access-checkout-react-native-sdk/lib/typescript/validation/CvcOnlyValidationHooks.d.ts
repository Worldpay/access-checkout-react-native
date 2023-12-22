import { AccessCheckout, CvcOnlyValidationConfig } from '../index';
import { CvcOnlyValidationEventListener } from './CvcOnlyValidationEventListener';
export declare function useCvcOnlyValidationEventListener(merchantListener: CvcOnlyValidationEventListener): void;
export declare function useCvcOnlyValidation(accessCheckout: AccessCheckout, cvcOnlyValidationConfig: CvcOnlyValidationConfig, merchantListener: CvcOnlyValidationEventListener): {
    initialiseCvcOnlyValidation: () => Promise<boolean>;
    initialiseCvcOnlyValidationPoc: () => Promise<boolean>;
};
