import Mockingjay
import React
import XCTest

@testable import AccessCheckoutReactNative
@testable import AccessCheckoutReactNativeUnitTestsApp

class AccessCheckoutReactNativeValidationUnitTests: XCTestCase {
    private let stubServices = StubServices(baseUrl: "http://localhost")
    let config: NSDictionary = [
        "baseUrl": "http://localhost",
        "panId": "pan",
        "expiryId": "expiry",
        "cvcId": "cvc",
    ]

    let storyboard = UIStoryboard(name: "CardValidationTest", bundle: nil)
    let rctEventEmitterMock = RCTEventEmitterMock()
    var expectationToFulfill: XCTestExpectation?
    var reactNativeViewLocatorMock: ReactNativeViewLocatorMock?
    var controller: CardValidationTestUIViewController? = nil
    var accessCheckoutReactNative: AccessCheckoutReactNative?
    var panUITextField: UITextField? = nil
    var expiryDateUITextField: UITextField? = nil
    var cvcUITextField: UITextField? = nil

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
        accessCheckoutReactNative = AccessCheckoutReactNative(
            reactNativeViewLocatorMock!, rctEventEmitterMock)
        expectationToFulfill = expectation(description: "Validation successfully wired")
    }

    func testShouldRaiseEventWhenPanBecomesValid() {
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.panUITextField!.insertText("4444333322221111")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)

            let event = self.rctEventEmitterMock.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "pan")
            XCTAssertTrue(event.body.isValid!)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 2)
    }

    func testShouldRaiseEventWhenPanBecomesInvalid() {
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.panUITextField!.insertText("4444333322221111")
            self.panUITextField!.deleteBackward()
            XCTAssertEqual(self.panUITextField!.text, "444433332222111")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 2)

            let event = self.rctEventEmitterMock.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "pan")
            XCTAssertFalse(event.body.isValid!)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldRaiseEventWhenCvcBecomesValid() {
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.cvcUITextField!.insertText("123")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)

            let event = self.rctEventEmitterMock.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertTrue(event.body.isValid!)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldRaiseEventWhenCvcBecomesInvalid() {
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.cvcUITextField!.insertText("123")
            self.cvcUITextField!.deleteBackward()
            XCTAssertEqual(self.cvcUITextField!.text, "12")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 2)

            let event = self.rctEventEmitterMock.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "cvc")
            XCTAssertFalse(event.body.isValid!)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldRaiseEventWhenExpiryBecomesValid() {
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.expiryDateUITextField!.insertText("10/34")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)

            let event = self.rctEventEmitterMock.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "expiry")
            XCTAssertTrue(event.body.isValid!)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldRaiseEventWhenExpiryBecomesInvalid() {
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.expiryDateUITextField!.insertText("10/34")
            self.expiryDateUITextField!.deleteBackward()
            XCTAssertEqual(self.expiryDateUITextField!.text, "10/3")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 2)

            let event = self.rctEventEmitterMock.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "expiry")
            XCTAssertFalse(event.body.isValid!)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldRaiseEventWhenCardBrandIsDetected() {
        _ = stubServices.stubCardConfiguration()
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            self.panUITextField!.insertText("4")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)

            let event = self.rctEventEmitterMock.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "brand")
            XCTAssertEqual(event.body.brand?.name, "visa")
            XCTAssertEqual(event.body.brand?.images?.count, 2)
            XCTAssertEqual(event.body.brand?.images?[0].type, "image/png")
            XCTAssertEqual(event.body.brand?.images?[0].url, "http://localhost/visa.png")
            XCTAssertEqual(event.body.brand?.images?[1].type, "image/svg+xml")
            XCTAssertEqual(event.body.brand?.images?[1].url, "http://localhost/visa.svg")

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldRaiseEventWhenCardBrandGoesFromDetectedToUndetected() {
        _ = stubServices.stubCardConfiguration()
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            self.panUITextField!.insertText("4")
            self.panUITextField!.deleteBackward()

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 2)

            let event = self.rctEventEmitterMock.eventsSent[1]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "brand")
            XCTAssertNil(event.body.brand)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldRaiseEventWhenAllFieldsBecomeValid() {
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.panUITextField!.insertText("4444333322221111")
            self.expiryDateUITextField!.insertText("12/34")
            self.cvcUITextField!.insertText("123")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 4)

            let event = self.rctEventEmitterMock.eventsSent[3]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "all")
            XCTAssertTrue(event.body.isValid!)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldNotRaiseEventWhenPanIsValidButBrandIsNotAnAcceptedCardBrand() {
        _ = stubServices.stubCardConfiguration()

        let config: NSDictionary = [
            "baseUrl": "http://localhost",
            "panId": "pan",
            "expiryId": "expiry",
            "cvcId": "cvc",
            "acceptedCardBrands": ["mastercard"],
        ]

        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            // Waiting for configuration to have successfully loaded
            self.wait(0.5)

            self.panUITextField!.insertText("4444333322221111")

            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)

            let event = self.rctEventEmitterMock.eventsSent[0]
            XCTAssertEqual(event.name, "AccessCheckoutValidationEvent")
            XCTAssertEqual(event.body.type, "brand")

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }

    func testShouldFormatPanWhenPanFormattingEnabled() {
        let config: NSDictionary = [
            "baseUrl": "http://localhost",
            "panId": "pan",
            "expiryId": "expiry",
            "cvcId": "cvc",
            "enablePanFormatting": true,
        ]

        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.panUITextField!.insertText("44443333")
            self.triggerTextFieldDelegate(self.panUITextField!)

            XCTAssertEqual(self.panUITextField!.text!, "4444 3333")

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail(
                "got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))"
            )
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
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
