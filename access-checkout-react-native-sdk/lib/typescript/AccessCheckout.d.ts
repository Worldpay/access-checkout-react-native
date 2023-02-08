import CardDetails from './session/CardDetails';
import Sessions from './session/Sessions';
import CardValidationConfig from './validation/CardValidationConfig';
import CvcOnlyValidationConfig from './validation/CvcOnlyValidationConfig';
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
    generateSessions(cardDetails: CardDetails, sessionTypes: string[]): Promise<Sessions>;
    initialiseCardValidation(validationConfig: CardValidationConfig): Promise<boolean>;
    initialiseCvcOnlyValidation(validationConfig: CvcOnlyValidationConfig): Promise<boolean>;
}
