import {SessionLabelPO} from './ui/SessionLabelPO.ts';
import {AccessCheckoutTextInputPO} from './ui/AccessCheckoutTextInputPO.ts';
import {UIComponentPO} from './ui/UIComponentPO.ts';
import {SubmitButtonPO} from './ui/SubmitButtonPO.ts';

export class CvcOnlyFlowPO {
  cvcOnlyNavItem: UIComponentPO;
  cvc: AccessCheckoutTextInputPO;
  submitButton: SubmitButtonPO;
  cvcSession: SessionLabelPO;

  constructor() {
    this.cvcOnlyNavItem = new UIComponentPO('nav-cvc');
    this.cvc = new AccessCheckoutTextInputPO('cvcInput');
    this.submitButton = new SubmitButtonPO('submitButton');
    this.cvcSession = new SessionLabelPO('cvcSession');
  }

  async selectCvcOnlyFlow() {
    await this.cvcOnlyNavItem.tap();
  }

  async submit() {
    await this.submitButton.tap();
  }
}
