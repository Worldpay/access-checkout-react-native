@testable import AccessCheckoutReactNative
import AccessCheckoutSDK
import React
import XCTest

class ReactNativeViewLocatorUnitTests: XCTestCase {
    private let controller = UIViewController()

    func testRegistryLookupPaperUIManager() {
          let field = createAccessCheckoutUITextField(nativeID: "pan-id")
          let bridge = RCTBridgeMock(paperStore: [1: field])
          let locator = ReactNativeViewLocator(bridge: bridge)
          locator.register(viewTag: 1 , id: "pan-id")

          let resolved = locator.locateUITextField(nativeID: "pan-id")
          XCTAssertTrue(resolved === field)
      }

      func testRegistryLookupFabricUIManager() {
          let field = createAccessCheckoutUITextField(nativeID: "cvc-id")

          let bridge = RCTBridgeMock(fabricStore: [202: field], useFabric: true)
          let locator = ReactNativeViewLocator(bridge: bridge)
          locator.register(viewTag: 202, id: "cvc-id")

          let resolved = locator.locateUITextField(nativeID: "cvc-id")
          XCTAssertTrue(resolved === field)
      }

      func testReturnsNilWhenNoController() {
          RCTUtilsUIOverride.setPresentedViewController(nil)
          let bridge = RCTBridgeMock()
          let locator = ReactNativeViewLocator(bridge: bridge)

          XCTAssertNil(locator.locateUITextField(nativeID: "missing"))
      }

      func testReturnsNilWhenViewTreeEmpty() {
          let controller = UIViewController()
          controller.view = UIView()
          RCTUtilsUIOverride.setPresentedViewController(controller)

          let bridge = RCTBridgeMock()
          let locator = ReactNativeViewLocator(bridge: bridge)

          XCTAssertNil(locator.locateUITextField(nativeID: "missing"))
      }

      func testReturnsNilWhenNotFoundInTree() {
          let root = UIView()
          let a = UIView()
          let b = UIView()
          root.addSubview(a)
          root.addSubview(b)
          a.addSubview(UIView())
          b.addSubview(UIView())

          let controller = UIViewController()
          controller.view = root
          RCTUtilsUIOverride.setPresentedViewController(controller)

          let bridge = RCTBridgeMock()
          let locator = ReactNativeViewLocator(bridge: bridge)

          XCTAssertNil(locator.locateUITextField(nativeID: "absent"))
      }

    func testRegistryPreferredOverFallback() {
        let fieldRegistry = createAccessCheckoutUITextField(nativeID: "conflict-id")
        let fieldFallback = createAccessCheckoutUITextField(nativeID: "conflict-id")
        let tag: NSNumber = 303
        let bridge = RCTBridgeMock(paperStore: [tag: fieldRegistry])
        let locator = ReactNativeViewLocator(bridge: bridge)
        locator.register(viewTag: tag, id: "conflict-id")
        let root = UIView()
        root.addSubview(fieldFallback)
        let controller = UIViewController()
        controller.view = root
        RCTUtilsUIOverride.setPresentedViewController(controller)
        let resolved = locator.locateUITextField(nativeID: "conflict-id")
        XCTAssertTrue(resolved === fieldRegistry)
    }

    private func createAccessCheckoutUITextField(nativeID: String) -> UIView {
        let textField = AccessCheckoutUITextField()
        textField.nativeID = nativeID
        return textField
    }
}

// MARK: - Fakes

final class FakePaperUIManager: NSObject {
    private let store: [NSNumber: UIView]
    init(store: [NSNumber: UIView]) { self.store = store }
    @objc func viewForReactTag(_ reactTag: NSNumber) -> UIView? {
        return store[reactTag]
    }
}

final class FakeFabricUIManager: NSObject {
    private let store: [NSNumber: UIView]
    init(store: [NSNumber: UIView]) { self.store = store }
    @objc func viewForReactTag(_ reactTag: NSNumber) -> UIView? {
        return store[reactTag]
    }
}

// MARK: - Mock Bridge
// Plain NSObject - no RCTBridge subclassing, no Hermes boot, no std::function crash.
final class RCTBridgeMock: NSObject {
    private let paperManager: FakePaperUIManager?
    private let fabricManager: FakeFabricUIManager?

    init(paperStore: [NSNumber: UIView] = [:],
         fabricStore: [NSNumber: UIView] = [:],
         useFabric: Bool = false) {
        self.paperManager = paperStore.isEmpty ? nil : FakePaperUIManager(store: paperStore)
        self.fabricManager = useFabric ? FakeFabricUIManager(store: fabricStore) : nil
    }

    override func responds(to aSelector: Selector!) -> Bool {
        if aSelector == Selector(("fabricUIManager")) { return fabricManager != nil }
        if aSelector == Selector(("viewForReactTag:")) { return paperManager != nil }
        return super.responds(to: aSelector)
    }

    override func value(forKey key: String) -> Any? {
        if key == "fabricUIManager" { return fabricManager }
        if key == "paperUIManager" { return paperManager }
        return super.value(forKey: key)
    }
}
