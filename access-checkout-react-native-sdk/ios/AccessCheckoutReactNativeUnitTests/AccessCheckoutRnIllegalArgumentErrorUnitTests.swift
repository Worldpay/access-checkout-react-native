import XCTest

@testable import AccessCheckoutReactNative

class AccessCheckoutRnIllegalArgumentErrorUnitTests: XCTestCase {
    func testLocalizedDescriptionShouldReturnMessage() {
        let error = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertEqual(error.localizedDescription, "Expected base url to be provided but was not")
        XCTAssertEqual(error.localizedDescription, error.message)
    }

    func testMissingBaseUrlMessage() {
        let error = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertEqual(error.message, "Expected base url to be provided but was not")
    }

    func testMissingMerchantIdMeessage() {
        let error = AccessCheckoutRnIllegalArgumentError.missingMerchantId()

        XCTAssertEqual(error.message, "Expected merchant ID to be provided but was not")
    }

    func testMissingPanMessage() {
        let error = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertEqual(error.message, "Expected pan to be provided but was not")
    }

    func testMissingPanIdMessage() {
        let error = AccessCheckoutRnIllegalArgumentError.missingPanId()

        XCTAssertEqual(error.message, "Expected pan id to be provided but was not")
    }

    func testMissingExpiryDateMessage() {
        let error = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertEqual(error.message, "Expected expiry date to be provided but was not")
    }

    func testMissingExpiryId() {
        let error = AccessCheckoutRnIllegalArgumentError.missingExpiryId()

        XCTAssertEqual(error.message, "Expected expiry id to be provided but was not")
    }

    func testMissingCvcMessage() {
        let error = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertEqual(error.message, "Expected cvc to be provided but was not")
    }

    func testMissingCvcId() {
        let error = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        XCTAssertEqual(error.message, "Expected cvc id to be provided but was not")
    }

    func testMissingSessionTypes() {
        let error = AccessCheckoutRnIllegalArgumentError.missingSessionTypes()

        XCTAssertEqual(error.message, "Expected session types to be provided but was not")
    }

    func testTooManySessionTypes() {
        let numberOfSessions = 2
        let error = AccessCheckoutRnIllegalArgumentError.tooManySessionTypes(
            numberFound: numberOfSessions)

        XCTAssertEqual(
            error.message,
            "Expected maximum of 2 session types to be provided but found \(numberOfSessions)")
    }

    func testSessionTypeIsNotString() {
        let error = AccessCheckoutRnIllegalArgumentError.sessionTypeIsNotString()

        XCTAssertEqual(error.message, "Expected session type value to be a string but was not")
    }

    func testUnrecognisedSessionType() {
        let incorrectSessionType = "something"
        let error = AccessCheckoutRnIllegalArgumentError.unrecognisedSessionType(
            type: incorrectSessionType)

        XCTAssertEqual(
            error.message,
            "Unrecgonised session type found \(incorrectSessionType), only CARD or CVC is accepted")
    }
}
