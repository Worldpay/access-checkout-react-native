
@testable import AccessCheckoutReactNative
@testable import AccessCheckoutReactNativeUnitTestsApp
@testable import AccessCheckoutSDK
import Mockingjay
import React
import XCTest

class AccessCheckoutReactNativeCvcOnlyValidationAcceptanceTests: XCTestCase {
    private let stubServices = StubServices(baseUrl: "http://localhost")
    private let config: NSDictionary = ["cvcId": "cvc"]

    private let storyboard = UIStoryboard(name: "CvcValidationTest", bundle: nil)
    private var reactNativeViewLocatorMock: ReactNativeViewLocatorMock?
    private var controller: CvcOnlyValidationTestUIViewController? = nil
    private var cvcACUITextField: AccessCheckoutUITextField? = nil

    override func setUp() {
        controller =
            (storyboard.instantiateViewController(
                withIdentifier: "CvcOnlyValidationTestUIViewController")
                as! CvcOnlyValidationTestUIViewController)
        controller!.loadViewIfNeeded()
        cvcACUITextField = controller!.cvcTextField
        reactNativeViewLocatorMock = ReactNativeViewLocatorMock(cvcView: cvcACUITextField!)
    }

    func testShouldReturnAnErrorWhenConfigurationProvidedIsInvalid() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let invalidConfig: NSDictionary = [:]
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)
        let expectedError = AccessCheckoutRnIllegalArgumentError.missingCvcId()

        accessCheckoutReactNative.initialiseCvcOnlyValidation(config: invalidConfig) { _ in
            XCTFail("validation initialisation should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldReturnAnErrorWhenCvcTextFieldNotFound() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)

        reactNativeViewLocatorMock!.cvcView = nil
        let expectedError = AccessCheckoutRnIllegalArgumentError.cvcTextFieldNotFound(
            cvcNativeId: "cvc")

        accessCheckoutReactNative.initialiseCvcOnlyValidation(config: config) { _ in
            XCTFail("validation initialisation should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldResolvePromiseWithTrueWhenSuccessfullyInitialised() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCvcOnlyValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from initialisation \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldRaiseEventWhenCvcBecomesValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCvcOnlyValidation(config: config) { success in
            XCTAssertEqual(true, (success as! Bool))

            let field = self.cvcACUITextField!.uiTextField
            field.insertText("123")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutCvcOnlyValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenCvcBecomesInvalid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCvcOnlyValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            let field = self.cvcACUITextField!.uiTextField
            field.insertText("123")
            field.deleteBackward()
            XCTAssertEqual(field.text, "12")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 3)

            let event = accessCheckoutReactNative.eventsSent[2]
            XCTAssertEqual(event.name, "AccessCheckoutCvcOnlyValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertFalse(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { a, b, c in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenAllFieldsBecomeValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCvcOnlyValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            let field = self.cvcACUITextField!.uiTextField
            field.insertText("123")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutCvcOnlyValidationEvent")
            XCTAssertEqual(event.body.type, "all")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { a, b, c in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    private func triggerTextFieldDelegate(_ textField: UITextField) {
        _ = textField.delegate?.textField?(
            textField,
            shouldChangeCharactersIn: NSRange(location: 0, length: 0),
            replacementString: "")
    }

    private func wait(_ timeoutInSeconds: TimeInterval) {
        let exp = XCTestCase().expectation(description: "Waiting for \(timeoutInSeconds)")
        _ = XCTWaiter.wait(for: [exp], timeout: timeoutInSeconds)
    }
}
