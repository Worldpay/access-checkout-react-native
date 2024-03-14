import {SessionLabelPO} from './ui/SessionLabelPO.ts';
import {TogglePO} from './ui/TogglePO.ts';
import {AccessCheckoutTextInputPO} from './ui/AccessCheckoutTextInputPO.ts';
import {SubmitButtonPO} from './ui/SubmitButtonPO.ts';

export class CardFlowPO {
  pan: AccessCheckoutTextInputPO;
  expiryDate: AccessCheckoutTextInputPO;
  cardAndCvcSessionsToggle: any;
  submitButton: SubmitButtonPO;
  cvc: AccessCheckoutTextInputPO;
  cardSession: SessionLabelPO;
  cvcSession: SessionLabelPO;

  constructor() {
    this.pan = new AccessCheckoutTextInputPO('panInput');
    this.expiryDate = new AccessCheckoutTextInputPO('expiryDateInput');
    this.cvc = new AccessCheckoutTextInputPO('cvcInput');
    this.submitButton = new SubmitButtonPO('submitButton');
    this.cardAndCvcSessionsToggle = new TogglePO('cardAndCvcSessionsToggle');
    this.cardSession = new SessionLabelPO('cardSession');
    this.cvcSession = new SessionLabelPO('cvcSession');
  }

  async toggleOnCardAndCvcSessions() {
    await this.cardAndCvcSessionsToggle.toggleOn();
  }

  async submit() {
    await this.submitButton.tap();
  }
}
