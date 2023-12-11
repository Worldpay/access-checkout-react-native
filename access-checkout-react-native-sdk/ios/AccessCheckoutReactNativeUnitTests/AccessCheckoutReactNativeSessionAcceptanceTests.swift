import Mockingjay
import XCTest

@testable import AccessCheckoutReactNative
@testable import AccessCheckoutSDK

class AccessCheckoutReactNativeSessionAcceptanceTests: XCTestCase {
    let accessCheckoutReactNative = AccessCheckoutReactNative()
    let stubServices = StubServices(baseUrl: "http://localhost")

    func testShouldSupportGeneratingACardSession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubSessionsDiscovery()
            .stubSessionsCardSessionSuccess(session: "my-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "panValue": "4444333322221111",
            "expiryDateValue": "12/30",
            "cvcValue": "123",
            "sessionTypes": ["card"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { sessions in
            let session = (sessions as! [String: String?])["card"]
            XCTAssertEqual("my-session", session)
            expectationToFulfill.fulfill()
        } reject: { _, message, error in
            XCTFail("got an unexpected error back from stubs: message=[\(String(describing: message)), error=\(String(describing: error?.localizedDescription))]")
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldSupportGeneratingACvcSession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubSessionsDiscovery()
            .stubSessionsCvcSessionSuccess(session: "my-cvc-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "cvcValue": "123",
            "sessionTypes": ["cvc"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { sessions in
            let cvcSession = (sessions as! [String: String?])["cvc"]
            XCTAssertEqual("my-cvc-session", cvcSession)
            expectationToFulfill.fulfill()
        } reject: { _, message, _ in
            XCTFail(message!)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldSupportGeneratingACardAndACvcSession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubSessionsCardSessionSuccess(session: "my-session")
            .stubSessionsDiscovery()
            .stubSessionsCvcSessionSuccess(session: "my-cvc-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "panValue": "4444333322221111",
            "expiryDateValue": "12/30",
            "cvcValue": "123",
            "sessionTypes": ["card", "cvc"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { sessions in
            let session = (sessions as! [String: String?])["card"]
            let cvcSession = (sessions as! [String: String?])["cvc"]
            XCTAssertEqual("my-session", session)
            XCTAssertEqual("my-cvc-session", cvcSession)
            expectationToFulfill.fulfill()
        } reject: { _, _, _ in
            XCTFail("got an unexpected error back from stubs")
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldSetNativeSdkWpSdkHeaderWithAccessCheckoutReactNativeVersion() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubSessionsDiscovery()
            .stubSessionsCvcSessionSuccess(session: "my-cvc-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "cvcValue": "123",
            "sessionTypes": ["cvc"],
            "reactNativeSdkVersion": "1.2.3",
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { _ in
            XCTAssertEqual("access-checkout-react-native/1.2.3", WpSdkHeader.value)

            expectationToFulfill.fulfill()
        } reject: { _, message, _ in
            XCTFail(message!)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldReturnAnErrorWhenFailingToGenerateASession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubSessionsDiscovery()
            .stubSessionsCardSessionSuccess(session: "my-session")
            .stubSessionsCardSessionFailure(
                errorName: "unexpectedApiError",
                errorMessage: "some error message")

        let expectationToFulfill = expectation(description: "Error should be returned")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "panValue": "4444333322221111",
            "expiryDateValue": "12/30",
            "cvcValue": "123",
            "sessionTypes": ["card"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { _ in
            XCTFail("generating sessions should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            let expectedError = AccessCheckoutError.unexpectedApiError(
                message: "some error message")
            XCTAssertEqual(error as! AccessCheckoutError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldReturnAnErrorWhenConfigurationProvidedIsInvalid() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let invalidConfig: NSDictionary = [:]

        accessCheckoutReactNative.generateSessions(config: invalidConfig) { _ in
            XCTFail("generating sessions should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldReturnAnErrorForCvcSessionWhenWhenCvcIsNil() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let invalidConfig: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "sessionTypes": ["cvc"],
        ]

        accessCheckoutReactNative.generateSessions(config: invalidConfig) { _ in
            XCTFail("generating sessions should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }
}
