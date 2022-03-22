import AccessCheckoutSDK
import React

class AccessCheckoutCardValidationDelegateRN: AccessCheckoutCardValidationDelegate {
    private let eventName: String
    private let eventEmitter: RCTEventEmitter

    init(eventEmitter: RCTEventEmitter, eventName: String) {
        self.eventEmitter = eventEmitter
        self.eventName = eventName
    }

     func cardBrandChanged(cardBrand: CardBrand?) {
        guard let cardBrand = cardBrand else {
            eventEmitter.sendEvent(withName: eventName, body: ["type": "brand", "value": nil])
            return
        }

        let name = cardBrand.name
        var images = [[String: String]]()
        for image in cardBrand.images {
            images.append(["type": image.type, "url": image.url])
        }

        eventEmitter.sendEvent(withName: eventName, body: ["type": "brand", "value": ["name": name, "images": images]])
    }

    func panValidChanged(isValid: Bool) {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "pan", "isValid": isValid])
    }

    func cvcValidChanged(isValid: Bool) {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "cvc", "isValid": isValid])
    }

    func expiryDateValidChanged(isValid: Bool) {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "expiryDate", "isValid": isValid])
    }

    func validationSuccess() {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "all", "isValid": true])
    }
}
