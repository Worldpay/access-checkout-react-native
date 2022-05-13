import XCTest

@testable import AccessCheckoutReactNative

class AccessCheckoutCvcOnlyValidationEventUnitTest: XCTestCase {
    func testThatConfigCannotBeCreatedWhenCvcIdIsAnEmptyString() {
        let dictionary: NSDictionary = ["cvcId": ""]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        XCTAssertThrowsError(try CvcOnlyValidationConfigRN(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenCvcIdIsNotAString() {
        let dictionary: NSDictionary = ["cvcId": 1]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        XCTAssertThrowsError(try CvcOnlyValidationConfigRN(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenCvcIdIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = [:]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        XCTAssertThrowsError(try CvcOnlyValidationConfigRN(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testConfigCanBeCreatedFromDictionary() {
        let dictionary: NSDictionary = ["cvcId": "some-cvc-id"]

        let config = try! CvcOnlyValidationConfigRN(dictionary: dictionary)

        XCTAssertEqual(config.cvcId, "some-cvc-id")
    }
}
