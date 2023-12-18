import Foundation
import React
import AccessCheckoutSDK

@objc(AccessCheckoutEditTextManager)
class AccessCheckoutEditTextManager: RCTViewManager {

  override func view() -> UIView! {
      return AccessCheckoutUITextField()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
