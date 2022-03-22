import Foundation
import React
import UIKit

@testable import AccessCheckoutReactNative

class ReactNativeViewLocatorMock: ReactNativeViewLocator {
    let panUITextField: UITextField
    let expiryDateUITextField: UITextField
    let cvcUITextField: UITextField

    init(
        panUITextField: UITextField, expiryDateUITextField: UITextField,
        cvcUITextField: UITextField
    ) {
        self.panUITextField = panUITextField
        self.expiryDateUITextField = expiryDateUITextField
        self.cvcUITextField = cvcUITextField
    }

    override internal func locateUITextField(id: String) -> UITextField? {
        if id.contains("pan") {
            return panUITextField
        } else if id.contains("expiryDate") {
            return expiryDateUITextField
        } else if id.contains("cvc") {
            return cvcUITextField
        }

        return nil
    }
}
