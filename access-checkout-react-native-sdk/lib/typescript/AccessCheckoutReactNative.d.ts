declare type BridgeSessions = {
    card: string;
    cvc: string;
};
interface AccessCheckoutReactNativeType {
    generateSessions(config: any): Promise<BridgeSessions>;
    initialiseCardValidation(config: any): Promise<boolean>;
    initialiseCvcOnlyValidation(config: any): Promise<boolean>;
    addListener: (eventType: string) => void;
    removeListeners: (count: number) => void;
}
declare const _default: AccessCheckoutReactNativeType;
export default _default;
