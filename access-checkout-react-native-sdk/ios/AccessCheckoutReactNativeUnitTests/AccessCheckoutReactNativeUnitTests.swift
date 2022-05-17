import XCTest

@testable import AccessCheckoutReactNative

class AccessCheckoutReactNativeUnitTests: XCTestCase {
    func testEventsSupportedByNativeModule() {
        let accessCheckoutReactNative = AccessCheckoutReactNative(ReactNativeViewLocatorMock())

        let supportedEvents = accessCheckoutReactNative.supportedEvents()

        XCTAssertEqual(
            supportedEvents,
            ["AccessCheckoutCardValidationEvent", "AccessCheckoutCvcOnlyValidationEvent"])
    }
}
