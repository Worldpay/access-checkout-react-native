import AccessCheckoutSDK
import Foundation
import React
import UIKit

@testable import AccessCheckoutReactNative

class ReactNativeViewLocatorMock: ReactNativeViewLocator {
    var panView: AccessCheckoutUITextField?
    var expiryDateView: AccessCheckoutUITextField?
    var cvcView: AccessCheckoutUITextField?

    init(
        panView: AccessCheckoutUITextField,
        expiryDateView: AccessCheckoutUITextField,
        cvcView: AccessCheckoutUITextField
    ) {
        self.panView = panView
        self.expiryDateView = expiryDateView
        self.cvcView = cvcView
    }

    init(cvcView: AccessCheckoutUITextField) {
        self.cvcView = cvcView
    }

    override init() {}

    override internal func locateUITextField(id: String) -> AccessCheckoutUITextField? {
        if id.contains("pan") {
            return self.panView
        } else if id.contains("expiryDate") {
            return self.expiryDateView
        } else if id.contains("cvc") {
            return self.cvcView
        }

        return nil
    }
}
