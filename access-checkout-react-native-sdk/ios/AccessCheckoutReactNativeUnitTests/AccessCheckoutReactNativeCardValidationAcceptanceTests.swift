@testable import AccessCheckoutReactNative
@testable import AccessCheckoutReactNativeUnitTestsApp
import AccessCheckoutSDK
import Mockingjay
import React
import XCTest

class AccessCheckoutReactNativeCardValidationAcceptanceTests: XCTestCase {
    private let stubServices = StubServices(baseUrl: "http://localhost")
    private let config: NSDictionary = [
        "baseUrl": "http://localhost",
        "panId": "pan",
        "expiryDateId": "expiryDate",
        "cvcId": "cvc",
    ]

    private let storyboard = UIStoryboard(name: "CardValidationTest", bundle: nil)
    private var reactNativeViewLocatorMock: ReactNativeViewLocatorMock?
    private var controller: CardValidationTestUIViewController? = nil
    private var panUITextField: AccessCheckoutUITextField? = nil
    private var expiryDateUITextField: AccessCheckoutUITextField? = nil
    private var cvcUITextField: AccessCheckoutUITextField? = nil

    override func setUp() {
        controller =
            (storyboard.instantiateViewController(
                withIdentifier: "CardValidationTestUIViewController")
                as! CardValidationTestUIViewController)
        controller!.loadViewIfNeeded()
        panUITextField = controller!.panTextField
        expiryDateUITextField = controller!.expiryDateTextField
        cvcUITextField = controller!.cvcTextField
        reactNativeViewLocatorMock = ReactNativeViewLocatorMock(
            panUITextField: panUITextField!,
            expiryDateUITextField: expiryDateUITextField!,
            cvcUITextField: cvcUITextField!)
    }

    func testShouldReturnAnErrorWhenConfigurationProvidedIsInvalid() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let invalidConfig: NSDictionary = [:]
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: invalidConfig) { _ in
            XCTFail("validation initialisation should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldReturnAnErrorWhenPanTextFieldNotFound() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)

        reactNativeViewLocatorMock!.panUITextField = nil
        let expectedError = AccessCheckoutRnIllegalArgumentError.panTextFieldNotFound(
            panNativeId: "pan")

        accessCheckoutReactNative.initialiseCardValidation(config: config) { _ in
            XCTFail("validation initialisation should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldReturnAnErrorWhenExpiryDateTextFieldNotFound() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)

        reactNativeViewLocatorMock!.expiryDateUITextField = nil
        let expectedError = AccessCheckoutRnIllegalArgumentError.expiryDateTextFieldNotFound(
            expiryDateNativeId: "expiryDate")

        accessCheckoutReactNative.initialiseCardValidation(config: config) { _ in
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

        reactNativeViewLocatorMock!.cvcUITextField = nil
        let expectedError = AccessCheckoutRnIllegalArgumentError.cvcTextFieldNotFound(
            cvcNativeId: "cvc")

        accessCheckoutReactNative.initialiseCardValidation(config: config) { _ in
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

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
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

    func testShouldRaiseEventWhenPanBecomesValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertEqual(true, (success as! Bool))

            let field = self.panUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("4444333322221111")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "pan")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 2)
    }

    func testShouldRaiseEventWhenPanBecomesInvalid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            let field = self.panUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("4444333322221111")
            field.deleteBackward()

            XCTAssertEqual(field.text, "444433332222111")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "pan")
            XCTAssertFalse(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenCvcBecomesValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertEqual(true, (success as! Bool))

            let field = self.cvcUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("123")
            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenCvcBecomesInvalid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            let field = self.cvcUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("123")
            field.deleteBackward()
            XCTAssertEqual(field.text, "12")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertFalse(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenExpiryBecomesValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertEqual(true, (success as! Bool))

            let field = self.expiryDateUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("10/34")
            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "expiryDate")
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

    func testShouldRaiseEventWhenExpiryBecomesInvalid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            let field = self.expiryDateUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("10/34")
            field.deleteBackward()
            XCTAssertEqual(field.text, "10/3")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "expiryDate")
            XCTAssertFalse(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenCardBrandIsDetected() {
        let expectationToFulfill = expectation(description: "run test successfully")
        _ = stubServices.stubCardConfiguration()
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            let field = self.panUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("4")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "brand")
            XCTAssertEqual(event.body.brand?.name, "visa")
            XCTAssertEqual(event.body.brand?.images?.count, 2)
            XCTAssertEqual(event.body.brand?.images?[0].type, "image/png")
            XCTAssertEqual(event.body.brand?.images?[0].url, "http://localhost/visa.png")
            XCTAssertEqual(event.body.brand?.images?[1].type, "image/svg+xml")
            XCTAssertEqual(event.body.brand?.images?[1].url, "http://localhost/visa.svg")

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 2)
    }

    func testShouldRaiseEventWhenCardBrandGoesFromDetectedToUndetected() {
        let expectationToFulfill = expectation(description: "run test successfully")
        _ = stubServices.stubCardConfiguration()
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            let field = self.panUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            field.insertText("4")
            field.deleteBackward()

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "brand")
            XCTAssertNil(event.body.brand)

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 2)
    }

    func testShouldRaiseEventWhenAllFieldsBecomeValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            let panField = self.panUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            panField.insertText("4444333322221111")
            let expiryField = self.expiryDateUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            expiryField.insertText("12/34")
            let cvcField = self.cvcUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            cvcField.insertText("123")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 4)

            let event = accessCheckoutReactNative.eventsSent[3]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "all")
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

    func testShouldNotRaiseEventWhenPanIsValidButBrandIsNotAnAcceptedCardBrand() {
        let expectationToFulfill = expectation(description: "run test successfully")
        _ = stubServices.stubCardConfiguration()
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        let config: NSDictionary = [
            "baseUrl": "http://localhost",
            "panId": "pan",
            "expiryDateId": "expiryDate",
            "cvcId": "cvc",
            "acceptedCardBrands": ["mastercard"],
        ]

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            let panField = self.panUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField
            panField.insertText("4444333322221111")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutCardValidationEvent")
            XCTAssertEqual(event.body.type, "brand")

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldFormatPanWhenPanFormattingEnabled() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let config: NSDictionary = [
            "baseUrl": "http://localhost",
            "panId": "pan",
            "expiryDateId": "expiryDate",
            "cvcId": "cvc",
            "enablePanFormatting": true,
        ]
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseCardValidation(config: config) { success in
            XCTAssertTrue(success as! Bool)

            let panField = self.panUITextField!.viewWithTag(AccessCheckoutUIFieldIdentifier.UITextField) as! UITextField

            panField.insertText("44443333")

            self.triggerTextFieldDelegate(panField)

            XCTAssertEqual(panField.text, "4444 3333")

            expectationToFulfill.fulfill()
        } reject: { _, _, error in
            XCTFail(
                "got an error back from validation: \(String(describing: error))"
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
