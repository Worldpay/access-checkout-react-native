import type { CvcValidationConfig } from '../validation/CvcValidationConfig';
export default class CvcOnlyConfig {
    cvcId: string;
    validationConfig?: CvcValidationConfig;
    constructor({ cvcId, validationConfig }: CvcOnlyConfig);
}
