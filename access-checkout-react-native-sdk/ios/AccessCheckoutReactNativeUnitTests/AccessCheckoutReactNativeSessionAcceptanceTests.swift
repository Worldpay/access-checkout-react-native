import Mockingjay
import XCTest

@testable import AccessCheckoutReactNative
@testable import AccessCheckoutSDK

class AccessCheckoutReactNativeSessionAcceptanceTests: XCTestCase {
    private let stubServices = StubServices(baseUrl: "http://localhost")

    private let storyboard = UIStoryboard(name: "SessionGenerationTest", bundle: nil)
    private var reactNativeViewLocatorMock: ReactNativeViewLocatorMock?
    private var controller: SessionGenerationTestUIViewController? = nil
    private var accessCheckoutReactNative: AccessCheckoutReactNative? = nil

    private var panUITextField: AccessCheckoutUITextField? = nil
    private var expiryDateUITextField: AccessCheckoutUITextField? = nil
    private var cvcUITextField: AccessCheckoutUITextField? = nil

    override func setUp() {
        controller =
            (storyboard.instantiateViewController(
                withIdentifier: "SessionGenerationTestUIViewController")
                as! SessionGenerationTestUIViewController)
        controller!.loadViewIfNeeded()

        panUITextField = controller!.panTextField
        expiryDateUITextField = controller!.expiryDateTextField
        cvcUITextField = controller!.cvcTextField

        reactNativeViewLocatorMock = ReactNativeViewLocatorMock(
            panUITextField: panUITextField!,
            expiryDateUITextField: expiryDateUITextField!,
            cvcUITextField: cvcUITextField!)

        accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)
    }

    func testShouldSupportGeneratingACardSession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubSessionsDiscovery()
            .stubSessionsCardSessionSuccess(session: "my-session")

        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary: NSDictionary = [
            "baseUrl": stubServices.baseUrl,
            "merchantId": "identity",
            "panId": "pan",
            "expiryDateId": "expiryDate",
            "cvcId": "cvc",
            "sessionTypes": ["card"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        panUITextField!.text = "4444333322221111"
        expiryDateUITextField!.text = "12/34"
        cvcUITextField!.text = "123"

        accessCheckoutReactNative!.generateSessions(config: dictionary) { sessions in
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
            "cvcId": "cvc",
            "sessionTypes": ["cvc"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        accessCheckoutReactNative!.generateSessions(config: dictionary) { sessions in
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
            "cvcId": "cvc",
            "panId": "pan",
            "expiryDateId": "expiryDate",
            "sessionTypes": ["card", "cvc"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        panUITextField!.text = "4444333322221111"
        expiryDateUITextField!.text = "12/34"
        cvcUITextField!.text = "123"

        accessCheckoutReactNative!.generateSessions(config: dictionary) { sessions in
            let session = (sessions as! [String: String?])["card"]
            let cvcSession = (sessions as! [String: String?])["cvc"]
            XCTAssertEqual("my-session", session)
            XCTAssertEqual("my-cvc-session", cvcSession)
            expectationToFulfill.fulfill()
        } reject: { _, message, _ in
            XCTFail("got an unexpected error back from stubs: " + message!)
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
            "cvcId": "cvc",
            "sessionTypes": ["cvc"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        accessCheckoutReactNative!.generateSessions(config: dictionary) { _ in
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
            "panId": "pan",
            "expiryDateId": "expiryDate",
            "cvcId": "cvc",
            "sessionTypes": ["card"],
            "reactNativeSdkVersion": "1.2.3"
        ]

        panUITextField!.text = "4444333322221111"
        expiryDateUITextField!.text = "12/34"
        cvcUITextField!.text = "123"

        accessCheckoutReactNative!.generateSessions(config: dictionary) { _ in
            XCTFail("generating sessions should have failed but it didn't")
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

        accessCheckoutReactNative!.generateSessions(config: invalidConfig) { _ in
            XCTFail("generating sessions should have failed but it didn't")
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
            "sessionTypes": ["cvc"]
        ]

        accessCheckoutReactNative!.generateSessions(config: invalidConfig) { _ in
            XCTFail("generating sessions should have failed but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvc()
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }
}
