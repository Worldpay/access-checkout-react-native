import XCTest

@testable import AccessCheckoutReactNative

class CvcOnlyValidationDelegateRNUnitTests: XCTestCase {
    private let eventEmitter = RCTEventEmitterMock()

    func testShouldEmitEventWhenCvcIsValid() {
        let delegate = CvcOnlyValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.cvcValidChanged(isValid: true)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "cvc")
        XCTAssertTrue(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenCvcIsInvalid() {
        let delegate = CvcOnlyValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.cvcValidChanged(isValid: false)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "cvc")
        XCTAssertFalse(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenValidationSuccess() {
        let delegate = CvcOnlyValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.validationSuccess()

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "all")
        XCTAssertTrue(eventEmitter.eventsSent[0].body.isValid!)
    }
}
