import UIKit
import AccessCheckoutSDK

@objc(AccessCheckoutTextInputManager)
class AccessCheckoutTextInputManager: RCTViewManager {

    override func view() -> UIView! {
        let field = AccessCheckoutUITextField()
        // replicate React Native defaults
        field.borderWidth = 0
        field.cornerRadius = 0
        field.horizontalPadding = 0

        return created
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
