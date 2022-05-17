import AccessCheckoutSDK
import Foundation
import XCTest

@testable import AccessCheckoutReactNative
@testable import AccessCheckoutSDK

class CardValidationDelegateRNUnitTests: XCTestCase {
    private let eventEmitter = RCTEventEmitterMock()

    func testShouldEmitEventWhenCardBrandChangedWithCardBrand() {
        let cardBrand = CardBrand(
            name: "visa",
            images: [
                CardBrandImage(type: "type-1", url: "url-1"),
                CardBrandImage(type: "type-2", url: "url-2"),
            ])

        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.cardBrandChanged(cardBrand: cardBrand)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        let event = eventEmitter.eventsSent[0]
        XCTAssertEqual(event.name, "event-name")
        XCTAssertEqual(event.body.type, "brand")
        XCTAssertEqual(event.body.brand?.name, "visa")
        XCTAssertEqual(event.body.brand?.images?[0].type, "type-1")
        XCTAssertEqual(event.body.brand?.images?[0].url, "url-1")
        XCTAssertEqual(event.body.brand?.images?[1].type, "type-2")
        XCTAssertEqual(event.body.brand?.images?[1].url, "url-2")
    }

    func testShouldEmitEventWhenCardBrandChangedWithNoCardBrand() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.cardBrandChanged(cardBrand: nil)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        let event = eventEmitter.eventsSent[0]
        XCTAssertEqual(event.name, "event-name")
        XCTAssertEqual(event.body.type, "brand")
        XCTAssertNil(event.body.brand)
    }

    func testShouldEmitEventWhenPanIsValid() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.panValidChanged(isValid: true)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "pan")
        XCTAssertTrue(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenPanIsInvalid() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.panValidChanged(isValid: false)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "pan")
        XCTAssertFalse(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenExpiryDateIsValid() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.expiryDateValidChanged(isValid: true)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "expiryDate")
        XCTAssertTrue(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenExpiryDateIsInvalid() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.expiryDateValidChanged(isValid: false)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "expiryDate")
        XCTAssertFalse(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenCvcIsValid() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.cvcValidChanged(isValid: true)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "cvc")
        XCTAssertTrue(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenCvcIsInvalid() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.cvcValidChanged(isValid: false)

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "cvc")
        XCTAssertFalse(eventEmitter.eventsSent[0].body.isValid!)
    }

    func testShouldEmitEventWhenValidationSuccess() {
        let delegate = CardValidationDelegateRN(
            eventEmitter: eventEmitter, eventName: "event-name")

        delegate.validationSuccess()

        XCTAssertEqual(eventEmitter.eventsSent.count, 1)
        XCTAssertEqual(eventEmitter.eventsSent[0].name, "event-name")
        XCTAssertEqual(eventEmitter.eventsSent[0].body.type, "all")
        XCTAssertTrue(eventEmitter.eventsSent[0].body.isValid!)
    }
}
