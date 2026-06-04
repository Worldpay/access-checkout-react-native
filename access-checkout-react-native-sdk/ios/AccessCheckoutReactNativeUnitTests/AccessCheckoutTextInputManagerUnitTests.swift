import AccessCheckoutSDK
import XCTest
import React

@testable import AccessCheckoutReactNative
@testable import AccessCheckoutSDK

class AccessCheckoutTextInputManagerUnitTests: XCTestCase {

    func testViewMethodReturnsInstanceOfAccessCheckoutUITextField() {
        let accessCheckoutTextInputManager = AccessCheckoutTextInputManager()

        let view = accessCheckoutTextInputManager.view()
        XCTAssertTrue(view is AccessCheckoutUITextField)
    }

    func testOnFocusChangeEventDispatchedWhenViewAcquiresFocus() {
        let accessCheckoutTextInputManager = AccessCheckoutTextInputManager()
        let textField = accessCheckoutTextInputManager.view() as! AccessCheckoutUITextField

        var onFocusChangePayload: [AnyHashable: Any]?
        textField.onFocusChange = { payload in
            onFocusChangePayload = payload
        }

        // we force call the event listener normally called when the component acquires focus
        // (true is passed to the listener when the textfield receives focus, hence why we use it here)
        textField.externalOnFocusChangedListener!(textField, true)

        XCTAssertNotNil(onFocusChangePayload)
        XCTAssertEqual(1, onFocusChangePayload!.count)
        XCTAssertEqual(onFocusChangePayload!["isFocused"] as? Bool, true)
    }

    func testOnFocusChangeEventDispatchedWhenViewLosesFocus() {
        let accessCheckoutTextInputManager = AccessCheckoutTextInputManager()
        let textField = accessCheckoutTextInputManager.view() as! AccessCheckoutUITextField

        var onFocusChangePayload: [AnyHashable: Any]?
        textField.onFocusChange = { payload in
            onFocusChangePayload = payload
        }

        // we force call the event listener normally called when the component acquires focus
        // (false is passed to the listener when the textfield loses focus, hence why we use it here)
        textField.externalOnFocusChangedListener!(textField, false)

        XCTAssertNotNil(onFocusChangePayload)
        XCTAssertEqual(1, onFocusChangePayload!.count)
        XCTAssertEqual(onFocusChangePayload!["isFocused"] as? Bool, false)
    }

    func testViewBecomesFirstResponderWhenReceivingFocusCommand() {
        let viewMock = UIViewMock()
        let viewManager = AccessCheckoutTextInputManagerFake(viewToFind: viewMock)

        viewManager.focus(1)

        let expectation = asyncAssert {
            XCTAssertTrue(viewMock.becomeFirstResponderCalled)
        }
        wait(for: [expectation], timeout: 1)
    }

    func testViewResignsAsFirstResponderWhenReceivingBlurCommand() {
        let viewMock = UIViewMock()
        let viewManager = AccessCheckoutTextInputManagerFake(viewToFind: viewMock)

        viewManager.blur(1)

        let expectation = asyncAssert {
            XCTAssertTrue(viewMock.resignFirstResponderCalled)
        }
        wait(for: [expectation], timeout: 1)
    }
}

class AccessCheckoutTextInputManagerFake : AccessCheckoutTextInputManager {
    private var viewToFind:UIView? = nil
    
    init(viewToFind:UIView?) {
        self.viewToFind = viewToFind
        self.viewToFind = viewToFind
    }

    override func findView(forReactTag node :NSNumber) -> UIView? {
        return viewToFind
    }
}
