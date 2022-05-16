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
            .stubVerifiedTokensDiscovery()
            .stubVerifiedTokensSessionSuccess(session: "my-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "panValue": "4444333322221111",
            "expiryDateValue": "12/30",
            "cvcValue": "123",
            "sessionTypes": ["card"],
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { (sessions) in
            let session = (sessions as! [String: String?])["card"]
            XCTAssertEqual("my-session", session)
            expectationToFulfill.fulfill()
        } reject: { (_, _, _) in
            XCTFail("got an unexpected error back from stubs")
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldSupportGeneratingACvcSession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubSessionsDiscovery()
            .stubSessionsSessionSuccess(session: "my-cvc-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "cvcValue": "123",
            "sessionTypes": ["cvc"],
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { (sessions) in
            let cvcSession = (sessions as! [String: String?])["cvc"]
            XCTAssertEqual("my-cvc-session", cvcSession)
            expectationToFulfill.fulfill()
        } reject: { (_, message, _) in
            XCTFail(message!)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldSupportGeneratingACardAndACvcSession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubVerifiedTokensDiscovery()
            .stubVerifiedTokensSessionSuccess(session: "my-session")
            .stubSessionsDiscovery()
            .stubSessionsSessionSuccess(session: "my-cvc-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "panValue": "4444333322221111",
            "expiryDateValue": "12/30",
            "cvcValue": "123",
            "sessionTypes": ["card", "cvc"],
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { (sessions) in
            let session = (sessions as! [String: String?])["card"]
            let cvcSession = (sessions as! [String: String?])["cvc"]
            XCTAssertEqual("my-session", session)
            XCTAssertEqual("my-cvc-session", cvcSession)
            expectationToFulfill.fulfill()
        } reject: { (_, _, _) in
            XCTFail("got an unexpected error back from stubs")
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testReturnAnErrorWhenFailingToGenerateASession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubVerifiedTokensDiscovery()
            .stubVerifiedTokensSessionSuccess(session: "my-session")
            .stubSessionsDiscovery()
            .stubVerifiedTokensSessionFailure(
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
        ]

        accessCheckoutReactNative.generateSessions(config: dictionary) { (sessions) in
            XCTFail("generating sessions should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { (errorCode, errorDescription, error) in
            let expectedError = AccessCheckoutError.unexpectedApiError(
                message: "some error message")
            XCTAssertEqual(error as! AccessCheckoutError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testReturnAnErrorWhenConfigurationProvidedIsInvalid() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let invalidConfig: NSDictionary = [:]

        accessCheckoutReactNative.generateSessions(config: invalidConfig) { (sessions) in
            XCTFail("generating sessions should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { (errorCode, errorDescription, error) in
            let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testReturnAnErrorWhenCvcIsNil() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let invalidConfig: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "sessionTypes": ["cvc"],
        ]

        accessCheckoutReactNative.generateSessions(config: invalidConfig) { (sessions) in
            XCTFail("generating sessions should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { (errorCode, errorDescription, error) in
            let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }
}

