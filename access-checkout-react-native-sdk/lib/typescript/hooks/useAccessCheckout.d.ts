import { CardConfig, CvcOnlyConfig, Sessions } from '../index';
export interface UseAccessCheckoutExports {
    initialiseValidation: () => Promise<boolean>;
    generateSessions: (sessionTypes: string[]) => Promise<Sessions>;
}
export interface UseAccessCheckout {
    baseUrl: string;
    checkoutId: string;
    config: CardConfig | CvcOnlyConfig;
}
export declare const useAccessCheckout: ({ baseUrl, checkoutId, config }: UseAccessCheckout) => UseAccessCheckoutExports;
//# sourceMappingURL=useAccessCheckout.d.ts.map