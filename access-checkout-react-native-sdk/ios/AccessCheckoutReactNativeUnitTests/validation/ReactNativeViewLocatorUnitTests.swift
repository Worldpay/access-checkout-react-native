import React
import XCTest

@testable import AccessCheckoutReactNative

class ReactNativeViewLocatorUnitTests: XCTestCase {
    private let viewLocator = ReactNativeViewLocator()
    private let controller = UIViewController()
    
    func testReturnsUITextFieldWhichIsAnImmediateChild() {
        let uiTextFieldToBeFound = RCTUITextField()
        let view = UIView()
        view.addSubview(UIView())
        view.addSubview(UITextFieldStub(uiTextFieldToBeFound, nativeID: "some-id"))
        controller.view = view
        RCTUtilsUIOverride.setPresentedViewController(controller)

        let result = viewLocator.locateUITextField(id: "some-id")

        XCTAssertEqual(result, uiTextFieldToBeFound)
    }
    
    func testReturnsUITextFieldWhichIsAChildOfAChild() {
        let uiTextFieldToBeFound = RCTUITextField()
        let view = UIView()
        view.addSubview(UIView())
        view.addSubview(UIView())
        view.subviews[1].addSubview(UIView())
        view.subviews[1].addSubview(UITextFieldStub(uiTextFieldToBeFound, nativeID: "some-id"))
        controller.view = view
        RCTUtilsUIOverride.setPresentedViewController(controller)

        let result = viewLocator.locateUITextField(id: "some-id")

        XCTAssertEqual(result, uiTextFieldToBeFound)
    }
    
    func testReturnsNilIfControllerIsNil() {
        let viewLocator = ReactNativeViewLocator()
        
        let result = viewLocator.locateUITextField(id: "some-id")

        XCTAssertNil(result)
    }
    
    func testReturnsNilIfControllerHasNoUIComponents() {
        let viewLocator = ReactNativeViewLocator()
        let controller = UIViewController()
        controller.view = UIView()
        RCTUtilsUIOverride.setPresentedViewController(controller)

        let result = viewLocator.locateUITextField(id: "some-id")

        XCTAssertNil(result)
    }
    
    func testReturnsNilIfTextFieldWithNativeIDNotFound() {
        let view = UIView()
        view.addSubview(UIView())
        view.addSubview(UIView())
        view.subviews[1].addSubview(UIView())
        view.subviews[1].addSubview(UIView())
        controller.view = view
        RCTUtilsUIOverride.setPresentedViewController(controller)

        let result = viewLocator.locateUITextField(id: "some-id")

        XCTAssertNil(result)
    }
    
    private class UITextFieldStub: RCTSinglelineTextInputView {
        private let uiTextField: UIView & RCTBackedTextInputViewProtocol
        
        override var backedTextInputView: UIView & RCTBackedTextInputViewProtocol {
            get {
                return uiTextField
            }
        }
        
        init(_ uiTextField: RCTUITextField, nativeID:String) {
            self.uiTextField = uiTextField
            
            let rctBridge = RCTBridge(
                    delegate: RCTBridgeDelegateStub(),
                    launchOptions: [NSHashTable<RCTBridge>(): ""]
            )
            super.init(bridge: rctBridge!)
            super.nativeID = nativeID
        }
        
        private class RCTBridgeDelegateStub: NSObject, RCTBridgeDelegate {
            func sourceURL(for bridge: RCTBridge!) -> URL! {
                return URL(string: "")
            }
        }
    }
}
