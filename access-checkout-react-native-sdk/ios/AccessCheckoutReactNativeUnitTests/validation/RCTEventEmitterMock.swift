import Foundation
import React

class RCTEventEmitterMock: RCTEventEmitter {
    private(set) var eventsSent: [RCTEventMock] = []

    override func sendEvent(withName name: String!, body: Any!) {
        let eventMock = RCTEventMock(name, bodyDictionary: body as! NSDictionary)
        eventsSent.append(eventMock)
    }

    override func supportedEvents() -> [String]! {
        return ["AccessCheckoutValidationEvent"]
    }
}
