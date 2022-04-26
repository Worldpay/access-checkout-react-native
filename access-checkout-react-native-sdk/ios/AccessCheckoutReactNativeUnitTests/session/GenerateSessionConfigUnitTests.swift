import XCTest
import AccessCheckoutSDK

@testable import AccessCheckoutReactNative

class GenerateSessionUnitTests: XCTestCase {

    // MARK: Testing errors related to base URL
    func testThatConfigCannotBeCreatedWhenBaseUrlIsAnEmptyString() {
        let dictionary: NSDictionary = ["baseUrl": ""]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenBaseUrlIsNotAString() {
        let dictionary: NSDictionary = ["baseUrl": 1]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenBaseUrlIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = ["some-other-key": "some"]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to merchant ID
    func testThatConfigCannotBeCreatedWhenMerchantIdIsAnEmptyString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingMerchantId()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenMerchantIdIsNotAString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": 1,
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingMerchantId()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenMerchantIdIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url"
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingMerchantId()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Pan Value
    func testThatConfigCannotBeCreatedWhenPanValueIsAnEmptyString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenPanValueIsNotAString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": 1,
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Expiry Value
    func testThatConfigCannotBeCreatedWhenExpiryValueIsAnEmptyString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenExpiryValueIsNotAString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": 1,
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Cvc Value
    func testThatConfigCannotBeCreatedWhenCvcValueIsAnEmptyString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenCvcValueIsNotAString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": 1,
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenCvcValueIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }
    
    // MARK: Testing errors related to Session types
    func testErrorIsRaisedWhenSessionTypesIsAbsent() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc"
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingSessionTypes()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }
    
    func testErrorIsRaisedWhenSessionTypesIsEmpty() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc",
            "sessionTypes": []
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingSessionTypes()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }
    
    func testErrorIsRaisedWhenMoreThan2SessionTypesArePassed() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc",
            "sessionTypes": ["card", "cvc", "card"]
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.tooManySessionTypes(numberFound: 3)

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }
    
    func testErrorIsRaisedWhenSessionTypeIsNotString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc",
            "sessionTypes": [1]
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.sessionTypeIsNotString()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }
    
    func testErrorIsRaisedWhenUnrecognisedSessionTypeIsPassed() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc",
            "sessionTypes": ["something-else"]
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.unrecognisedSessionType(type: "something-else")

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }
    
    // MARK: Testing happy paths
    func testGenerateSessionConfigCanBeCreatedWithAllCardDetails() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc",
            "sessionTypes": ["card", "cvc"]
        ]
        
        let config = try! GenerateSessionConfig(dictionary: dictionary)
        
        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.panValue, "some-pan")
        XCTAssertEqual(config.expiryDateValue, "some-expiry-date")
        XCTAssertEqual(config.cvcValue, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card, SessionType.cvc])
    }
    
    func testThatConfigCanBeCreatedWithCvcOnly() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "cvcValue": "some-cvc",
            "sessionTypes": ["cvc"]
        ]
        
        let config = try! GenerateSessionConfig(dictionary: dictionary)
        
        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.cvcValue, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.cvc])
    }
    
    func testGenerateSessionConfigSessionTypesCanBePopulatedIndependentlyOfCase() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc",
            "sessionTypes": ["cArD", "CVC"]
        ]
        
        let config = try! GenerateSessionConfig(dictionary: dictionary)
        
        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.panValue, "some-pan")
        XCTAssertEqual(config.expiryDateValue, "some-expiry-date")
        XCTAssertEqual(config.cvcValue, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card, SessionType.cvc])
    }
}
