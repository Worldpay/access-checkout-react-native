import AccessCheckoutSDK
import Foundation
import React

@objc(AccessCheckoutInputTextManager)
class AccessCheckoutInputTextManager: RCTViewManager {
    override func view() -> UIView! {
        return AccessCheckoutUITextField()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
