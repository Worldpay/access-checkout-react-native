import XCTest

@testable import AccessCheckoutReactNative

class AccessCheckoutReactNativeUnitTests: XCTestCase {
    func testEventsSupportedByNativeModule() {
        let viewlocatorMock = ReactNativeViewLocatorMock()
        let accessCheckoutReactNative = AccessCheckoutReactNative()

        let supportedEvents = accessCheckoutReactNative.supportedEvents()

        XCTAssertEqual(
            supportedEvents,
            ["AccessCheckoutCardValidationEvent", "AccessCheckoutCvcOnlyValidationEvent"])
    }
}
