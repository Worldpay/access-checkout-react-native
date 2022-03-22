import XCTest
@testable import AccessCheckoutReactNative

class ValidationConfigUnitTests: XCTestCase {

    // MARK: Testing errors related to base URL
    func testThatConfigCannotBeCreatedWhenBaseUrlIsAnEmptyString() {
        let dictionary: NSDictionary = ["baseUrl": ""]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenBaseUrlIsNotAString() {
        let dictionary: NSDictionary = ["baseUrl": 1]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenBaseUrlIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = ["some-other-key": "some-value"]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Pan Id
    func testThatConfigCannotBeCreatedWhenPanIdIsAnEmptyString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPanId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenPanIdIsNotAString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": 1,
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPanId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenPanIdIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url"
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPanId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Expiry Id
    func testThatConfigCannotBeCreatedWhenExpiryIdIsAnEmptyString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
            "expiryDateId": "",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenExpiryIdIsNotAString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
            "expiryDateId": 1,
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenExpiryIdIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Cvc Id
    func testThatConfigCannotBeCreatedWhenCvcIdIsAnEmptyString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
            "cvcId": "",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenCvcIdIsNotAString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
            "cvcId": 1,
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatConfigCannotBeCreatedWhenCvcIdIsAbsentFromTheDictionary() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
        ]
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        XCTAssertThrowsError(try ValidationConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }
    
    // MARK: Tests related to happy paths
    func testValidationConfigCanBePopulatedFromDictionary() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
            "cvcId": "some-cvc-id",
            "enablePanFormatting": true,
            "acceptedCardBrands": ["brand-1", "brand-2"]
        ]
        
        let config = try! ValidationConfig(dictionary: dictionary)
        
        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.panId, "some-pan-id")
        XCTAssertEqual(config.expiryDateId, "some-expiry-date-id")
        XCTAssertEqual(config.cvcId, "some-cvc-id")
        XCTAssertEqual(config.enablePanFormatting, true)
        XCTAssertEqual(config.acceptedCardBrands, ["brand-1", "brand-2"])
    }
    
    func testThatEnablePanFormattingIsFalseWhenEntryInDictionaryIsNotABoolean() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
            "cvcId": "some-cvc-id",
            "enablePanFormatting": "some-string"
        ]
        
        let config = try! ValidationConfig(dictionary: dictionary)
        
        XCTAssertFalse(config.enablePanFormatting)
    }
    
    func testThatEnablePanFormattingIsFalseByDefault() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
            "cvcId": "some-cvc-id",
        ]
        
        let config = try! ValidationConfig(dictionary: dictionary)
        
        XCTAssertFalse(config.enablePanFormatting)
    }
    
    func testThatAcceptedCardBrandsIsEmptyWhenEntryInDictionaryIsNotAnArrayOfString() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
            "cvcId": "some-cvc-id",
            "acceptedCardBrands": 1
        ]
        
        let config = try! ValidationConfig(dictionary: dictionary)
        
        XCTAssertEqual(config.acceptedCardBrands, [])
    }
    
    func testThatAcceptedCardBrandsIsEmptyByDefault() {
        let dictionary: NSDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panId": "some-pan-id",
            "expiryDateId": "some-expiry-date-id",
            "cvcId": "some-cvc-id"
        ]
        
        let config = try! ValidationConfig(dictionary: dictionary)
        
        XCTAssertEqual(config.acceptedCardBrands, [])
    }
}

