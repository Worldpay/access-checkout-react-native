import AccessCheckoutSDK
import XCTest

@testable import AccessCheckoutReactNative

class GenerateSessionUnitTests: XCTestCase {
    // MARK: Testing errors related to base URL

    func testThatErrorIsRaisedWhenBaseUrlIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "baseUrl")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenBaseUrlIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "baseUrl")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenBaseUrlIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "baseUrl")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to merchant ID

    func testThatErrorIsRaisedWhenMerchantIdIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "merchantId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingMerchantId()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenMerchantIdIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "merchantId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingMerchantId()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenMerchantIdIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "merchantId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingMerchantId()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Pan Value

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndPanValueIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "panValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndPanValueIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "panValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndPanValueIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "panValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Expiry Value

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndExpiryDateValueIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "expiryDateValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndExpiryDateValueIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "expiryDateValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndExpiryDateValueIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "expiryDateValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Cvc Value

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndCvcValueIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "cvcValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndCvcValueIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "cvcValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndCvcValueIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "cvcValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesIsOnlyCvcAndCvcValueIsAbsent() {
        let dictionary = validCvcOnlyConfiguration()
        dictionary.removeObject(forKey: "cvcValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesIsOnlyCvcAndCvcValueIsAnEmptyString() {
        let dictionary = validCvcOnlyConfiguration()
        dictionary.setValue("", forKey: "cvcValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesOnlyCvcAndCvcValueIsNotAString() {
        let dictionary = validCvcOnlyConfiguration()
        dictionary.setValue(1, forKey: "cvcValue")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Session types

    func testErrorIsRaisedWhenSessionTypesIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "sessionTypes")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingSessionTypes()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testErrorIsRaisedWhenSessionTypesIsEmpty() {
        let dictionary = validCardConfiguration()
        dictionary.setValue([], forKey: "sessionTypes")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingSessionTypes()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testErrorIsRaisedWhenMoreThan2SessionTypesArePassed() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(["card", "cvc", "card"], forKey: "sessionTypes")

        let expectedError = AccessCheckoutRnIllegalArgumentError.tooManySessionTypes(numberFound: 3)

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testErrorIsRaisedWhenSessionTypeIsNotString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue([1], forKey: "sessionTypes")

        let expectedError = AccessCheckoutRnIllegalArgumentError.sessionTypeIsNotString()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testErrorIsRaisedWhenStringWithUnknownSessionTypeIsPassed() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(["something-else"], forKey: "sessionTypes")

        let expectedError = AccessCheckoutRnIllegalArgumentError.unrecognisedSessionType(
            type: "something-else")

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to React Native SDK version

    func testErrorIsRaisedWhenACOReactNativeSdkVersionIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "reactNativeSdkVersion")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingReactNativeSdkVersion()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenACOReactNativeSdkVersionIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "reactNativeSdkVersion")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingReactNativeSdkVersion()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenACOReactNativeSdkVersionIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "reactNativeSdkVersion")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingReactNativeSdkVersion()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing happy paths

    func testConfigCanBeCreatedForCardSessionType() {
        let dictionary = validCardConfiguration()

        let config = try! GenerateSessionConfig(dictionary: dictionary)

        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.panValue, "some-pan")
        XCTAssertEqual(config.expiryDateValue, "some-expiry-date")
        XCTAssertEqual(config.cvcValue, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    func testThatConfigCanBeCreatedForCvcOnlySessionType() {
        let dictionary = validCvcOnlyConfiguration()

        let config = try! GenerateSessionConfig(dictionary: dictionary)

        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.cvcValue, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.cvc])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    func testConfigCanBeCreatedForCardAndCvcSessionTypes() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(["card", "cvc"], forKey: "sessionTypes")

        let config = try! GenerateSessionConfig(dictionary: dictionary)

        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.panValue, "some-pan")
        XCTAssertEqual(config.expiryDateValue, "some-expiry-date")
        XCTAssertEqual(config.cvcValue, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card, SessionType.cvc])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    func testGenerateSessionConfigSessionTypesCanBePopulatedIndependentlyOfCase() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(["cArD", "CVC"], forKey: "sessionTypes")

        let config = try! GenerateSessionConfig(dictionary: dictionary)

        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.panValue, "some-pan")
        XCTAssertEqual(config.expiryDateValue, "some-expiry-date")
        XCTAssertEqual(config.cvcValue, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card, SessionType.cvc])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    private func validCardConfiguration() -> NSMutableDictionary {
        let dictionary: NSMutableDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panValue": "some-pan",
            "expiryDateValue": "some-expiry-date",
            "cvcValue": "some-cvc",
            "sessionTypes": ["card"],
            "reactNativeSdkVersion": "some-version"
        ]
        return dictionary
    }

    private func validCvcOnlyConfiguration() -> NSMutableDictionary {
        let dictionary: NSMutableDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "cvcValue": "some-cvc",
            "sessionTypes": ["cvc"],
            "reactNativeSdkVersion": "some-version"
        ]
        return dictionary
    }
}
