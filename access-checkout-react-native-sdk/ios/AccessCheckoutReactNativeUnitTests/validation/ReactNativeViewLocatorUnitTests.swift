@testable import AccessCheckoutReactNative
import AccessCheckoutSDK
import React
import XCTest

class ReactNativeViewLocatorUnitTests: XCTestCase {
    private let viewLocator = ReactNativeViewLocator()
    private let controller = UIViewController()

    func testReturnsUITextFieldWhichIsAnImmediateChild() {
        let uiTextFieldToBeFound = createAccessCheckoutUITextField(nativeID: "some-id")
        let view = UIView()
        view.addSubview(UIView())
        view.addSubview(uiTextFieldToBeFound)
        controller.view = view
        RCTUtilsUIOverride.setPresentedViewController(controller)

        let result = viewLocator.locateUIView(view: RCTPresentedViewController(), id: "some-id")

        XCTAssertEqual(result, uiTextFieldToBeFound)
    }

    func testReturnsUITextFieldWhichIsAChildOfAChild() {
        let uiTextFieldToBeFound = createAccessCheckoutUITextField(nativeID: "some-id")
        let view = UIView()
        view.addSubview(UIView())
        view.addSubview(UIView())
        view.subviews[1].addSubview(UIView())
        view.subviews[1].addSubview(uiTextFieldToBeFound)
        controller.view = view
        RCTUtilsUIOverride.setPresentedViewController(controller)

        let result = viewLocator.locateUIView(view: RCTPresentedViewController(), id: "some-id")

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

    private func createAccessCheckoutUITextField(nativeID: String) -> UIView {
        let textField = AccessCheckoutUITextField()
        textField.nativeID = nativeID
        return textField
    }
}
