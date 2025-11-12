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

    override internal func locateUITextField(nativeID: String) -> AccessCheckoutUITextField? {
        if nativeID.contains("pan") {
            return self.panView
        } else if nativeID.contains("expiryDate") {
            return self.expiryDateView
        } else if nativeID.contains("cvc") {
            return self.cvcView
        }

        return nil
    }
}
