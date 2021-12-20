export default class CardValidationConfig {
  panId: string;
  expiryDateId: string;
  cvcId: string;
  enablePanFormatting: boolean = false;
  acceptedCardBrands: string[] = [];

  constructor({
    panId,
    expiryDateId,
    cvcId,
    enablePanFormatting,
    acceptedCardBrands,
  }: {
    panId: string;
    expiryDateId: string;
    cvcId: string;
    enablePanFormatting?: boolean;
    acceptedCardBrands?: string[];
  }) {
    this.panId = panId;
    this.expiryDateId = expiryDateId;
    this.cvcId = cvcId;
    this.enablePanFormatting = enablePanFormatting
      ? enablePanFormatting
      : false;
    this.acceptedCardBrands = acceptedCardBrands ? acceptedCardBrands : [];
  }
}
