import AccessCheckoutSDK
import React

class CvcOnlyValidationDelegateRN: AccessCheckoutCvcOnlyValidationDelegate {
    private let eventName: String
    private let eventEmitter: RCTEventEmitter

    init(eventEmitter: RCTEventEmitter, eventName: String) {
        self.eventEmitter = eventEmitter
        self.eventName = eventName
    }

    func cvcValidChanged(isValid: Bool) {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "cvc", "isValid": isValid])
    }

    func validationSuccess() {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "all", "isValid": true])
    }
}
