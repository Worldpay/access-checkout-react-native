import {SessionLabelPO} from './ui/SessionLabelPO.ts';
import {AccessCheckoutTextInputPO} from './ui/AccessCheckoutTextInputPO.ts';
import {SubmitButtonPO} from './ui/SubmitButtonPO.ts';

export class CardFlowPO {
  pan: AccessCheckoutTextInputPO;
  expiryDate: AccessCheckoutTextInputPO;
  submitButton: SubmitButtonPO;
  cvc: AccessCheckoutTextInputPO;
  cardSession: SessionLabelPO;
  cvcSession: SessionLabelPO;

  constructor() {
    this.pan = new AccessCheckoutTextInputPO('panInput');
    this.expiryDate = new AccessCheckoutTextInputPO('expiryDateInput');
    this.cvc = new AccessCheckoutTextInputPO('cvcInput');
    this.submitButton = new SubmitButtonPO('submitButton');
    this.cardSession = new SessionLabelPO('cardSession');
    this.cvcSession = new SessionLabelPO('cvcSession');
  }
  async submit() {
    await this.submitButton.tap();
  }
}
