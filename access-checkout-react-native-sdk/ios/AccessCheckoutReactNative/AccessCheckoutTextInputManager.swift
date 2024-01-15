import AccessCheckoutSDK
import Foundation

import React

@objc(AccessCheckoutTextInputManager)
class AccessCheckoutTextInputManager: RCTViewManager {
    override func view() -> UIView! {
        var field = AccessCheckoutUITextField()

        // In order to replicate React Native behaviours in both ios and android we need reset
        // the default padding, borders and radius added by AccessCheckoutUITextField
        field.borderWidth = 0
        field.cornerRadius = 0
        field.horizontalPadding = 0

        return field
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
