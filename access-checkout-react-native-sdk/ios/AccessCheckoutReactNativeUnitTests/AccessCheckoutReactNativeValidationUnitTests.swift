@testable import AccessCheckoutReactNative
@testable import AccessCheckoutReactNativeUnitTestsApp
import XCTest
import Mockingjay
import React

class AccessCheckoutReactNativeValidationUnitTests: XCTestCase {
    private let stubServices = StubServices(baseUrl: "http://localhost")
    private let backspace = String(XCUIKeyboardKey.delete.rawValue)
    let config:NSDictionary = ["baseUrl": "http://localhost",
                      "panId": "pan",
                      "expiryId": "expiry",
                      "cvcId": "cvc"
    ]
    let storyboard = UIStoryboard(name: "CardValidationTest", bundle: nil)
    let rctEventEmitterMock = RCTEventEmitterMock ()
    var expectationToFulfill:XCTestExpectation?
    var reactNativeViewLocatorMock:ReactNativeViewLocatorMock?
    var controller:CardValidationTestUIViewController? = nil
    var accessCheckoutReactNative:AccessCheckoutReactNative?
    var panUITextField:UITextField? = nil
    var expiryDateUITextField:UITextField? = nil
    var cvcUITextField:UITextField? = nil
    
    


    override func setUp() {
        controller = (storyboard.instantiateViewController(identifier: "CardValidationTestUIViewController") as! CardValidationTestUIViewController)
        controller!.loadViewIfNeeded()
        panUITextField = controller!.panTextField
        expiryDateUITextField = controller!.expiryDateTextField
        cvcUITextField = controller!.cvcTextField
        reactNativeViewLocatorMock = ReactNativeViewLocatorMock(panUITextField: panUITextField!,
                                                                expiryDateUITextField: expiryDateUITextField!,
                                                                cvcUITextField: cvcUITextField!)
        accessCheckoutReactNative = AccessCheckoutReactNative(reactNativeViewLocatorMock!, rctEventEmitterMock)
        expectationToFulfill = expectation(description: "Validation successfully wired")
    }
    
    
    func testShouldRaiseEventWhenPanBecomesValid() {


        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.panUITextField!.insertText("4444333322221111")
            
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent[0].name, "AccessCheckoutValidationEvent")
            
            let type:String = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["type"] as! String
            XCTAssertEqual(type, "pan")
            
            let isValid:Bool = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["isValid"] as! Bool
            XCTAssertTrue(isValid)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail("got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))")
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 2)
    }
    
    func testShouldRaiseEventWhenPanBecomesInvalid() {

        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.panUITextField!.insertText("4444333322221111")
            self.panUITextField!.deleteBackward()
            
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 2)
            XCTAssertEqual(self.panUITextField!.text, "444433332222111")
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent[1].name, "AccessCheckoutValidationEvent")
            
            let type:String = (self.rctEventEmitterMock.eventsSent[1].body as! NSDictionary)["type"] as! String
            XCTAssertEqual(type, "pan")
            
            let isValid:Bool = (self.rctEventEmitterMock.eventsSent[1].body as! NSDictionary)["isValid"] as! Bool
            XCTAssertFalse(isValid)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail("got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))")
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }
    
    
    func testShouldRaiseEventWhenCvcBecomesValid() {
        
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.cvcUITextField!.insertText("123")
            
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent[0].name, "AccessCheckoutValidationEvent")
            
            let type:String = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["type"] as! String
            XCTAssertEqual(type, "cvc")
            
            let isValid:Bool = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["isValid"] as! Bool
            XCTAssertTrue(isValid)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail("got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))")
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }
    
    func testShouldRaiseEventWhenCvcBecomesInvalid() {

        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.cvcUITextField!.insertText("123")
            self.cvcUITextField!.deleteBackward()
            
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 2)
            XCTAssertEqual(self.cvcUITextField!.text, "12")
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent[1].name, "AccessCheckoutValidationEvent")
            
            let type:String = (self.rctEventEmitterMock.eventsSent[1].body as! NSDictionary)["type"] as! String
            XCTAssertEqual(type, "cvc")
            
            let isValid:Bool = (self.rctEventEmitterMock.eventsSent[1].body as! NSDictionary)["isValid"] as! Bool
            XCTAssertFalse(isValid)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail("got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))")
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }
    
    func testShouldRaiseEventWhenExpiryBecomesValid() {

        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertEqual(true, (success as! Bool))

            self.expiryDateUITextField!.insertText("10/34")
            
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent[0].name, "AccessCheckoutValidationEvent")
            
            let type:String = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["type"] as! String
            XCTAssertEqual(type, "expiry")
            
            let isValid:Bool = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["isValid"] as! Bool
            XCTAssertTrue(isValid)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail("got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))")
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }
    
    func testShouldRaiseEventWhenExpiryBecomesInvalid() {

        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)

            self.expiryDateUITextField!.insertText("10/34")
            self.expiryDateUITextField!.deleteBackward()
            
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 2)
            XCTAssertEqual(self.expiryDateUITextField!.text, "10/3")
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent[1].name, "AccessCheckoutValidationEvent")
            
            let type:String = (self.rctEventEmitterMock.eventsSent[1].body as! NSDictionary)["type"] as! String
            XCTAssertEqual(type, "expiry")
            
            let isValid:Bool = (self.rctEventEmitterMock.eventsSent[1].body as! NSDictionary)["isValid"] as! Bool
            XCTAssertFalse(isValid)

            self.expectationToFulfill!.fulfill()
        } reject: { (a, b, c) in
            XCTFail("got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))")
            self.expectationToFulfill!.fulfill()
        }

        wait(for: [expectationToFulfill!], timeout: 1)
    }
    
        
    func testShouldRaiseEventWhenCardBrandBecomesValid(){
        _=stubServices.stubCardConfiguration()
        accessCheckoutReactNative!.initialiseValidation(config: config) { (success) in
            XCTAssertTrue(success as! Bool)
            
            _ = XCTWaiter.wait(for: [self.expectation(description: "Waiting for 1 second")], timeout: 1.0)
            
            self.panUITextField!.insertText("4")
                
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent.count, 1)
            XCTAssertEqual(self.rctEventEmitterMock.eventsSent[0].name, "AccessCheckoutValidationEvent")
                
            let type:String = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["type"] as! String
            XCTAssertEqual(type, "brand")
                
            let brand:NSDictionary = (self.rctEventEmitterMock.eventsSent[0].body as! NSDictionary)["value"] as! NSDictionary
            XCTAssertEqual(brand["name"]as! String, "visa")

            self.expectationToFulfill!.fulfill()
            } reject: { (a, b, c) in
                XCTFail("got an error back from validation \(String(describing: a)) \(String(describing: b)) \(String(describing: c))")
                self.expectationToFulfill!.fulfill()
            }

            wait(for: [expectationToFulfill!], timeout: 1)
    }
    
    
    class RCTEventEmitterMock : RCTEventEmitter {
        private(set) var eventsSent:[ReactNativeEventMock] = []
        
        override func sendEvent(withName name: String!, body: Any!) {
            let eventMock = ReactNativeEventMock(name: name, body: body!)
            eventsSent.append(eventMock)
        }
        
        override func supportedEvents() -> [String]! {
            return ["AccessCheckoutValidationEvent"]
        }
    }
    
    struct ReactNativeEventMock {
        let name:String
        let body:Any
    }
    
    class ReactNativeViewLocatorMock : ReactNativeViewLocator {
        let panUITextField:UITextField
        let expiryDateUITextField:UITextField
        let cvcUITextField:UITextField
        
        init(panUITextField:UITextField, expiryDateUITextField:UITextField,cvcUITextField:UITextField) {
            self.panUITextField = panUITextField
            self.expiryDateUITextField = expiryDateUITextField
            self.cvcUITextField = cvcUITextField
        }
        
        override internal func locateUITextField(id:String) -> UITextField? {
            if id.contains("pan") {
                return panUITextField
            } else if id.contains("expiry") {
                return expiryDateUITextField
            } else if id.contains("cvc") {
                return cvcUITextField
            }
            
            return nil
        }
    }
    
    private func wait(_ timeoutInSeconds: TimeInterval) {
        let exp = XCTestCase().expectation(description: "Waiting for \(timeoutInSeconds)")
        _ = XCTWaiter.wait(for: [exp], timeout: timeoutInSeconds)
    }
}
