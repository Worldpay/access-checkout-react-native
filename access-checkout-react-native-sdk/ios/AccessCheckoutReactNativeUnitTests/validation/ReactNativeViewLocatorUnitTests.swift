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

      func testFallbackImmediateChild() {
          let field = createAccessCheckoutUITextField(nativeID: "some-id")
          let root = UIView()
          root.addSubview(field)

          let controller = UIViewController()
          controller.view = root
          RCTUtilsUIOverride.setPresentedViewController(controller)

          let bridge = RCTBridgeMock()
          let locator = ReactNativeViewLocator(bridge: bridge)
          
          XCTAssertTrue(locator.locateUITextField(nativeID: "some-id") === field)
      }

      func testFallbackNestedChild() {
          let field = AccessCheckoutUITextField()
          field.nativeID = "deep-id"
          let root = UIView()
          let level1 = UIView()
          let level2 = UIView()
          root.addSubview(level1)
          level1.addSubview(level2)
          level2.addSubview(field)

          let controller = UIViewController()
          controller.view = root
          RCTUtilsUIOverride.setPresentedViewController(controller)

          let bridge = RCTBridgeMock()
          let locator = ReactNativeViewLocator(bridge: bridge)
          
          XCTAssertTrue(locator.locateUITextField(nativeID: "deep-id") === field)
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

import Foundation
import React

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

final class RCTBridgeMock: RCTBridge {
    private let paper: FakePaperUIManager?
    private let fabric: FakeFabricUIManager?

    init(paperStore: [NSNumber: UIView] = [:],
         fabricStore: [NSNumber: UIView] = [:],
         useFabric: Bool = false) {
        self.paper = FakePaperUIManager(store: paperStore)
        self.fabric = useFabric ? FakeFabricUIManager(store: fabricStore) : nil
        super.init(delegate: nil, launchOptions: nil)
    }

    override var uiManager: RCTUIManager? {
        guard let paper = paper else { return nil }
        // Minimal shim
        let shim = RCTUIManager()
        // Inject method dynamically
        shim.performSelector(onMainThread: Selector(("setValue:forKey:")), with: paper, waitUntilDone: true)
        return paper.responds(to: Selector(("viewForReactTag:"))) ? shim : nil
    }

    // Exposed via KVC for fabric path
    @objc override func value(forKey key: String) -> Any? {
        if key == "fabricUIManager" {
            return fabric
        }
        return super.value(forKey: key)
    }

    override func responds(to aSelector: Selector!) -> Bool {
        if aSelector == Selector(("fabricUIManager")) {
            return fabric != nil
        }
        return super.responds(to: aSelector)
    }
}
