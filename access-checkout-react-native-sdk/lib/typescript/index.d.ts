declare type Session = {
    card: string;
    cvc: string;
};
declare type AccessCheckoutReactNativeType = {
    generateSessions(config: any): Promise<Session>;
    initialiseValidation(config: any): Promise<boolean>;
};
declare const _default: AccessCheckoutReactNativeType;
export default _default;
