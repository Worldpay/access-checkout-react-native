import AccessCheckout from '../AccessCheckout';
import { CvcValidationEventListener } from './CvcValidationEventListener';
import CvcOnlyValidationConfig from "./CvcOnlyValidationConfig";
export declare function useCvcOnlyValidationEventListener(merchantListener: CvcValidationEventListener): void;
export declare function useCvcOnlyValidation(accessCheckout: AccessCheckout, cvcOnlyValidationConfig: CvcOnlyValidationConfig, merchantListener: CvcValidationEventListener): {
    initialiseCvcOnlyValidation: () => Promise<boolean>;
};
