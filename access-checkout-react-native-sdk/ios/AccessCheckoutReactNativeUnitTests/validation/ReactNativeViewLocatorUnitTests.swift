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

final class FakePaperUIManager: RCTUIManager {
    private let store: [NSNumber: UIView]
    init(store: [NSNumber: UIView]) {
        self.store = store
        super.init()
    }
    override func view(forReactTag reactTag: NSNumber!) -> UIView! {
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

final class BridgeDelegateStub: NSObject, RCTBridgeDelegate {
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        // Dummy URL (never loaded in unit tests)
        return URL(string: "file://example")
    }
}
import Foundation
import React
import UIKit

final class RCTBridgeMock: RCTBridge {
    private let paperManager: FakePaperUIManager?
    private let fabricManager: FakeFabricUIManager?

    init(paperStore: [NSNumber: UIView] = [:],
         fabricStore: [NSNumber: UIView] = [:],
         useFabric: Bool = false) {

        self.paperManager = paperStore.isEmpty ? nil : FakePaperUIManager(store: paperStore)
        self.fabricManager = useFabric ? FakeFabricUIManager(store: fabricStore) : nil
        let delegate = BridgeDelegateStub()

        super.init(delegate: delegate,
                   bundleURL: nil,
                   moduleProvider: nil,
                   launchOptions: nil)
    }

    override var uiManager: RCTUIManager? {
        return paperManager
    }

    override func responds(to aSelector: Selector!) -> Bool {
        if aSelector == Selector(("fabricUIManager")) {
            return fabricManager != nil
        }
        return super.responds(to: aSelector)
    }

    override func value(forKey key: String) -> Any? {
        if key == "fabricUIManager" {
            return fabricManager
        }
        return super.value(forKey: key)
    }
}
