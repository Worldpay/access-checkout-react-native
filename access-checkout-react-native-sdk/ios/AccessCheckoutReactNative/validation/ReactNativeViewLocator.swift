import AccessCheckoutSDK
import Foundation
import React

class ReactNativeViewLocator {

    private var registry: [String: NSNumber] = [:]
    private weak var bridge: RCTBridge?

    init(bridge: RCTBridge?) {
        self.bridge = bridge
    }

    /**
     Registers a viewTag for a nativeId
     */
    func register(viewTag: NSNumber, id: String) {
        registry[id] = viewTag
    }

    /**
     Clears the viewTag registry
     */
    func clear() {
        registry.removeAll()
    }

    // MARK: - Public lookup

    /**
       Resolves a previously registered view by its React Native nativeId.
       This approach uses the following strategies:

       1. Primary: Attempt to obtain the React Native UIManager (supports both Paper & Fabric) via pre-populated registry
       2. Fallback: Traverse view hierarchy using nativeId.
    */
    func locateUITextField(nativeID: String) -> AccessCheckoutUITextField? {
        // Registry based lookup
        if let viaRegistry = resolveFromRegistry(nativeID: nativeID) as? AccessCheckoutUITextField {
            return viaRegistry
        }
        // Fallback search
        return fallbackLocateByNativeID(nativeID: nativeID)
    }

    private func resolveFromRegistry(nativeID: String) -> UIView? {
        guard let reactTag = registry[nativeID] else {
            return nil
        }
        return resolveViewForReactTag(reactTag)
    }

    /**
      Resolves a UIView for a given React tag using Paper or Fabric UIManager.
     */
    private func resolveViewForReactTag(_ reactTag: NSNumber) -> UIView? {
        guard let bridge = self.bridge else { return nil }

        // FABRIC (New Architecture)
        if bridge.responds(to: Selector(("fabricUIManager"))) {
            if let fabricUIManager = bridge.value(forKey: "fabricUIManager") as? NSObject,
               let result = fabricUIManager.perform(Selector(("viewForReactTag:")), with: reactTag) {
                return result.takeUnretainedValue() as? UIView
            }
        }

        // PAPER (Old Architecture)
        if let uiManager = bridge.uiManager,
           uiManager.responds(to: Selector(("viewForReactTag:"))) {
            return uiManager.view(forReactTag: reactTag)
        }

        return nil
    }

    // MARK: - Fallback logic using nativeID (legacy support)
    private func fallbackLocateByNativeID(nativeID: String) -> AccessCheckoutUITextField? {
        guard let controller = RCTPresentedViewController() else { return nil }
        guard let root = controller.view else { return nil }

        if let view = searchForView(subViews: root.subviews, nativeId: nativeID) {
            return view as? AccessCheckoutUITextField
        }

        return nil
    }

    private func searchForView(subViews: [UIView], nativeId: String) -> UIView? {
        for subView in subViews {
            if subView.nativeID == nativeId {
                return subView
            }

            if let found = searchForView(subViews: subView.subviews, nativeId: nativeId) {
                return found
            }
        }
        return nil
    }
}
