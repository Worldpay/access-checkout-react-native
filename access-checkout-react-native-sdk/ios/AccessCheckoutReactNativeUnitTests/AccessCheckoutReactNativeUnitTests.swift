@testable import AccessCheckoutReactNative
import XCTest

class AccessCheckoutReactNativeUnitTests: XCTestCase {
    let accessCheckoutReactNative = AccessCheckoutReactNative()

    func testSupportedEventsAreOnly_AccessCheckoutValidationEvent() {
        XCTAssertEqual(["AccessCheckoutValidationEvent"], accessCheckoutReactNative.supportedEvents())
    }
}
