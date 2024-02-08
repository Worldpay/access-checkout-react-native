import AccessCheckoutSDK
import React
import XCTest

@testable import AccessCheckoutReactNative
@testable import AccessCheckoutReactNativeUnitTestsApp

public class AccessCheckoutReactNativeTestImplementation: AccessCheckoutReactNative {
    private(set) var eventsSent: [RCTEventMock] = []

    override public func sendEvent(withName name: String!, body: Any!) {
        let eventMock = RCTEventMock(name, bodyDictionary: body as! NSDictionary)
        eventsSent.append(eventMock)
    }

    // This is required to get the "testShouldRaiseEventWhenAllFieldsBecomeValid" test pass otherwise it fails with an error we have not been able to resolve
    override public func supportedEvents() -> [String]! {
        return ["some-event-type"]
    }
}
