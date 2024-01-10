import AccessCheckoutSDK
import Foundation

import React

@objc(AccessCheckoutTextInputManager)
class AccessCheckoutTextInputManager: RCTViewManager {
    override func view() -> UIView! {
        return AccessCheckoutUITextField()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
