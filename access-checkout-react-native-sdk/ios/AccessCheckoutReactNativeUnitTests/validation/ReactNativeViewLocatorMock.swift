import Foundation
import React
import UIKit

@testable import AccessCheckoutReactNative

class ReactNativeViewLocatorMock: ReactNativeViewLocator {
    var panUITextField: UITextField?
    var expiryDateUITextField: UITextField?
    var cvcUITextField: UITextField?

    init(
        panUITextField: UITextField, expiryDateUITextField: UITextField, cvcUITextField: UITextField
    ) {
        self.panUITextField = panUITextField
        self.expiryDateUITextField = expiryDateUITextField
        self.cvcUITextField = cvcUITextField
    }

    init(cvcUITextField: UITextField) {
        self.cvcUITextField = cvcUITextField
    }
    
    override init() {
        
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
