import type SessionGenerationConfig from './session/SessionGenerationConfig';
import type Sessions from './session/Sessions';
interface InitialiseCardValidationConfig {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    enablePanFormatting?: boolean;
    acceptedCardBrands?: string[];
}
interface InitialiseCvcOnlyValidationConfig {
    cvcId: string;
}
export default class AccessCheckout {
    private readonly ReactNativeSdkVersion;
    static readonly CardValidationEventType = "AccessCheckoutCardValidationEvent";
    static readonly CvcOnlyValidationEventType = "AccessCheckoutCvcOnlyValidationEvent";
    baseUrl: string;
    merchantId?: string;
    constructor({ baseUrl, merchantId, }: {
        baseUrl: string;
        merchantId?: string;
    });
    generateSessions(sessionGenerationConfig: SessionGenerationConfig, sessionTypes: string[]): Promise<Sessions>;
    initialiseCardValidation(validationConfig: InitialiseCardValidationConfig): Promise<boolean>;
    initialiseCvcOnlyValidation(validationConfig: InitialiseCvcOnlyValidationConfig): Promise<boolean>;
}
export {};
