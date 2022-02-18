import Mockingjay
import React
import XCTest

@testable import AccessCheckoutReactNative
@testable import AccessCheckoutReactNativeUnitTestsApp

class AccessCheckoutReactNativeValidationUnitTests: XCTestCase {
    private let stubServices = StubServices(baseUrl: "http://localhost")
    private let config: NSDictionary = [
        "baseUrl": "http://localhost",
        "panId": "pan",
        "expiryId": "expiry",
        "cvcId": "cvc",
    ]

    private let storyboard = UIStoryboard(name: "CardValidationTest", bundle: nil)
    private var reactNativeViewLocatorMock: ReactNativeViewLocatorMock?
    private var controller: CardValidationTestUIViewController? = nil
    private var panUITextField: UITextField? = nil
    private var expiryDateUITextField: UITextField? = nil
    private var cvcUITextField: UITextField? = nil

    override func setUp() {
        controller =
            (storyboard.instantiateViewController(identifier: "CardValidationTestUIViewController")
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

    func testEventsSupportedByNativeModule() {
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)

        XCTAssertEqual(
            accessCheckoutReactNative.supportedEvents(), ["AccessCheckoutValidationEvent"])
    }

    func testReturnAnErrorWhenConfigurationProvidedIsInvalid() {
        let expectationToFulfill = expectation(description: "Error should be returned")
        let invalidConfig: NSDictionary = [:]
        let accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: invalidConfig) { (success) in
            XCTFail("validation initialisation should have faild but it didn't")
            expectationToFulfill.fulfill()
        } reject: { (errorCode, errorDescription, error) in
            let expectedError = AccessCheckoutRnIllegalArgumentError.missingBaseUrl()
            XCTAssertEqual(error as! AccessCheckoutRnIllegalArgumentError, expectedError)
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 5)
    }

    func testShouldRaiseEventWhenPanBecomesValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.panUITextField!.insertText("4444333322221111")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "pan")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 2)
    }

    func testShouldRaiseEventWhenPanBecomesInvalid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.panUITextField!.insertText("4444333322221111")
            self.panUITextField!.deleteBackward()
            XCTAssertEqual(self.panUITextField!.text, "444433332222111")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "pan")
            XCTAssertFalse(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenCvcBecomesValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.cvcUITextField!.insertText("123")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenCvcBecomesInvalid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.cvcUITextField!.insertText("123")
            self.cvcUITextField!.deleteBackward()
            XCTAssertEqual(self.cvcUITextField!.text, "12")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertFalse(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenExpiryBecomesValid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.expiryDateUITextField!.insertText("10/34")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "expiry")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenExpiryBecomesInvalid() {
        let expectationToFulfill = expectation(description: "run test successfully")
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.expiryDateUITextField!.insertText("10/34")
            self.expiryDateUITextField!.deleteBackward()
            XCTAssertEqual(self.expiryDateUITextField!.text, "10/3")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "expiry")
            XCTAssertFalse(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
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

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            self.panUITextField!.insertText("4")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "brand")
            XCTAssertEqual(event.body.brand?.name, "visa")
            XCTAssertEqual(event.body.brand?.images?.count, 2)
            XCTAssertEqual(event.body.brand?.images?[0].type, "image/png")
            XCTAssertEqual(event.body.brand?.images?[0].url, "http://localhost/visa.png")
            XCTAssertEqual(event.body.brand?.images?[1].type, "image/svg+xml")
            XCTAssertEqual(event.body.brand?.images?[1].url, "http://localhost/visa.svg")

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            expectationToFulfill.fulfill()
        }

        wait(for: [expectationToFulfill], timeout: 1)
    }

    func testShouldRaiseEventWhenCardBrandGoesFromDetectedToUndetected() {
        let expectationToFulfill = expectation(description: "run test successfully")
        _ = stubServices.stubCardConfiguration()
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            self.panUITextField!.insertText("4")
            self.panUITextField!.deleteBackward()

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 2)

            let event = accessCheckoutReactNative.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "brand")
            XCTAssertNil(event.body.brand)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
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

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.panUITextField!.insertText("4444333322221111")
            self.expiryDateUITextField!.insertText("12/34")
            self.cvcUITextField!.insertText("123")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 4)

            let event = accessCheckoutReactNative.eventsSent[3]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "all")
            XCTAssertTrue(event.body.isValid!)

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
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
            "expiryId": "expiry",
            "cvcId": "cvc",
            "acceptedCardBrands": ["mastercard"],
        ]

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            self.panUITextField!.insertText("4444333322221111")

            XCTAssertEqual(accessCheckoutReactNative.eventsSent.count, 1)

            let event = accessCheckoutReactNative.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "brand")

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
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
            "expiryId": "expiry",
            "cvcId": "cvc",
            "enablePanFormatting": true,
        ]
        let accessCheckoutReactNative = AccessCheckoutReactNativeTestImplementation(
            reactNativeViewLocatorMock!)

        accessCheckoutReactNative.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.panUITextField!.insertText("44443333")
            self.triggerTextFieldDelegate(self.panUITextField!)

            XCTAssertEqual(self.panUITextField!.text!, "4444 3333")

            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
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

    private class AccessCheckoutReactNativeTestImplementation: AccessCheckoutReactNative {
        private(set) var eventsSent: [RCTEventMock] = []

        override func sendEvent(withName name: String!, body: Any!) {
            let eventMock = RCTEventMock(name, bodyDictionary: body as! NSDictionary)
            eventsSent.append(eventMock)
        }

        // This is required to get the "testShouldFormatPanWhenPanFormattingEnabled" test pass otherwise it fails with an error we have not been able to resolve
        override func supportedEvents() -> [String]! {
            return ["some-event-type"]
        }
    }
}
