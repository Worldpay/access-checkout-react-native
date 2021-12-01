import AccessCheckoutSDK
import React

class AccessCheckoutCardValidationDelegateRN: AccessCheckoutCardValidationDelegate {
    private let eventName: String
    private let eventEmitter: RCTEventEmitter
    
    init(eventEmitter: RCTEventEmitter, eventName: String) {
        self.eventEmitter = eventEmitter
        self.eventName = eventName
    }
    
    public func cardBrandChanged(cardBrand: CardBrand?) {
        if cardBrand == nil {
            eventEmitter.sendEvent(withName: eventName, body: ["type": "brand", "value": nil])
            return
        }
        
        var images = [[String: String]]()
        for image in cardBrand!.images {
            images.append(["type": image.type, "url": image.url])
        }
        
        eventEmitter.sendEvent(withName: eventName, body: ["type": "brand", "value": ["images": images]])
    }
    
    public func panValidChanged(isValid: Bool) {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "pan", "isValid": isValid])
    }
    
    public func cvcValidChanged(isValid: Bool) {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "cvc", "isValid": isValid])
    }
    
    public func expiryDateValidChanged(isValid: Bool) {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "expiry", "isValid": isValid])
    }
    
    public func validationSuccess() {
        eventEmitter.sendEvent(withName: eventName, body: ["type": "all", "isValid": true])
    }
}
