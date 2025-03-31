export const __esModule: boolean;
export default AccessCheckout;
declare class AccessCheckout {
    constructor({ baseUrl, merchantId }: {
        baseUrl: any;
        merchantId: any;
    });
    baseUrl: any;
    merchantId: any;
    generateSessions(sessionGenerationConfig: any, sessionTypes: any): Promise<any>;
    initialiseCardValidation(validationConfig: any): Promise<any>;
    initialiseCvcOnlyValidation(validationConfig: any): Promise<any>;
}
