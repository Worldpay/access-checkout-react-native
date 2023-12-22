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

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndpanIdIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "panId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndpanIdIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "panId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndpanIdIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "panId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingPan()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Expiry Value

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndexpiryDateIdIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "expiryDateId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndexpiryDateIdIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "expiryDateId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndexpiryDateIdIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "expiryDateId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingExpiryDate()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    // MARK: Testing errors related to Cvc Value

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndcvcIdIsAbsent() {
        let dictionary = validCardConfiguration()
        dictionary.removeObject(forKey: "cvcId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndcvcIdIsAnEmptyString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue("", forKey: "cvcId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesContainsCardAndcvcIdIsNotAString() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(1, forKey: "cvcId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesIsOnlyCvcAndcvcIdIsAbsent() {
        let dictionary = validCvcOnlyConfiguration()
        dictionary.removeObject(forKey: "cvcId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesIsOnlyCvcAndcvcIdIsAnEmptyString() {
        let dictionary = validCvcOnlyConfiguration()
        dictionary.setValue("", forKey: "cvcId")

        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()

        XCTAssertThrowsError(try GenerateSessionConfig(dictionary: dictionary)) { error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
        }
    }

    func testThatErrorIsRaisedWhenSessionTypesOnlyCvcAndcvcIdIsNotAString() {
        let dictionary = validCvcOnlyConfiguration()
        dictionary.setValue(1, forKey: "cvcId")

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
        XCTAssertEqual(config.panId, "some-pan")
        XCTAssertEqual(config.expiryDateId, "some-expiry-date")
        XCTAssertEqual(config.cvcId, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    func testThatConfigCanBeCreatedForCvcOnlySessionType() {
        let dictionary = validCvcOnlyConfiguration()

        let config = try! GenerateSessionConfig(dictionary: dictionary)

        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.cvcId, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.cvc])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    func testConfigCanBeCreatedForCardAndCvcSessionTypes() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(["card", "cvc"], forKey: "sessionTypes")

        let config = try! GenerateSessionConfig(dictionary: dictionary)

        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.panId, "some-pan")
        XCTAssertEqual(config.expiryDateId, "some-expiry-date")
        XCTAssertEqual(config.cvcId, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card, SessionType.cvc])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    func testGenerateSessionConfigSessionTypesCanBePopulatedIndependentlyOfCase() {
        let dictionary = validCardConfiguration()
        dictionary.setValue(["cArD", "CVC"], forKey: "sessionTypes")

        let config = try! GenerateSessionConfig(dictionary: dictionary)

        XCTAssertEqual(config.baseUrl, "some-url")
        XCTAssertEqual(config.merchantId, "some-merchant-id")
        XCTAssertEqual(config.panId, "some-pan")
        XCTAssertEqual(config.expiryDateId, "some-expiry-date")
        XCTAssertEqual(config.cvcId, "some-cvc")
        XCTAssertEqual(config.sessionTypes, [SessionType.card, SessionType.cvc])
        XCTAssertEqual(config.reactNativeSdkVersion, "some-version")
    }

    private func validCardConfiguration() -> NSMutableDictionary {
        let dictionary: NSMutableDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "panId": "some-pan",
            "expiryDateId": "some-expiry-date",
            "cvcId": "some-cvc",
            "sessionTypes": ["card"],
            "reactNativeSdkVersion": "some-version"
        ]
        return dictionary
    }

    private func validCvcOnlyConfiguration() -> NSMutableDictionary {
        let dictionary: NSMutableDictionary = [
            "baseUrl": "some-url",
            "merchantId": "some-merchant-id",
            "cvcId": "some-cvc",
            "sessionTypes": ["cvc"],
            "reactNativeSdkVersion": "some-version"
        ]
        return dictionary
    }
}
