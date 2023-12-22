import AccessCheckoutSDK
import Foundation
import React
import UIKit

@testable import AccessCheckoutReactNative

class ReactNativeViewLocatorMock: ReactNativeViewLocator {
    var panUITextField: AccessCheckoutUITextField?
    var expiryDateUITextField: AccessCheckoutUITextField?
    var cvcUITextField: AccessCheckoutUITextField?

    init(
        panUITextField: AccessCheckoutUITextField,
        expiryDateUITextField: AccessCheckoutUITextField,
        cvcUITextField: AccessCheckoutUITextField
    ) {
        self.panUITextField = panUITextField
        self.expiryDateUITextField = expiryDateUITextField
        self.cvcUITextField = cvcUITextField
    }

    init(cvcUITextField: AccessCheckoutUITextField) {
        self.cvcUITextField = cvcUITextField
    }

    override init() {}

    override internal func locateUITextField(id: String) -> AccessCheckoutUITextField? {
        if id.contains("pan") {
            return self.panUITextField
        } else if id.contains("expiryDate") {
            return self.expiryDateUITextField
        } else if id.contains("cvc") {
            return self.cvcUITextField
        }

        return nil
    }
}
