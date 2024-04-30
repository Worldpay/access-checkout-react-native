import {SessionLabelPO} from './ui/SessionLabelPO.ts';
import {AccessCheckoutTextInputPO} from './ui/AccessCheckoutTextInputPO.ts';
import {SubmitButtonPO} from './ui/SubmitButtonPO.ts';
import {UIComponentPO} from './ui/UIComponentPO.ts';

export class CardAndCvcFlowPO {
  pan: AccessCheckoutTextInputPO;
  expiryDate: AccessCheckoutTextInputPO;
  submitButton: SubmitButtonPO;
  cvc: AccessCheckoutTextInputPO;
  cardSession: SessionLabelPO;
  cvcSession: SessionLabelPO;
  private cardAndCvcNavItem: UIComponentPO;

  constructor() {
    this.cardAndCvcNavItem = new UIComponentPO('nav-cardAndCvc');
    this.pan = new AccessCheckoutTextInputPO('panInput');
    this.expiryDate = new AccessCheckoutTextInputPO('expiryDateInput');
    this.cvc = new AccessCheckoutTextInputPO('cvcInput');
    this.submitButton = new SubmitButtonPO('submitButton');
    this.cardSession = new SessionLabelPO('cardSession');
    this.cvcSession = new SessionLabelPO('cvcSession');
  }
  async selectCardAndCvcOnlyFlow() {
    await this.cardAndCvcNavItem.tap();
  }

  async submit() {
    await this.submitButton.tap();
  }
}
