import { CardDetails } from './session/CardDetails';
import CardValidationConfig from './validation/CardValidationConfig';
export default class AccessCheckout {
    static ValidationEventType: string;
    accessBaseUrl: string;
    merchantId?: string;
    constructor({ accessBaseUrl, merchantId, }: {
        accessBaseUrl: string;
        merchantId?: string;
    });
    generateSessions(cardDetails: CardDetails, sessionTypes: string[]): Promise<Map<string, string>>;
    initialiseValidation(validationConfig: CardValidationConfig): Promise<boolean>;
}
