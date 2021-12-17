export default class CvcOnlyValidationConfig {
  cvcId: string;

  constructor({ cvcId }: { cvcId: string }) {
    this.cvcId = cvcId;
  }
}
