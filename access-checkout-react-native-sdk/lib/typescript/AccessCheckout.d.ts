import CardDetails from './session/CardDetails';
import Sessions from './session/Sessions';
import CardValidationConfig from './validation/CardValidationConfig';
export default class AccessCheckout {
    static CardValidationEventType: string;
    baseUrl: string;
    merchantId?: string;
    constructor({ baseUrl, merchantId, }: {
        baseUrl: string;
        merchantId?: string;
    });
    generateSessions(cardDetails: CardDetails, sessionTypes: string[]): Promise<Sessions>;
    initialiseCardValidation(validationConfig: CardValidationConfig): Promise<boolean>;
}
