import AccessCheckoutSDK
import React

// Key for associated object storage
private var onFocusChangeAssociatedObjectKey: UInt8 = 0

extension AccessCheckoutUITextField {
    @objc var placeholderTextColor: UIColor? {
        get { return nil }
        set {
            let text = self.placeholder ?? ""
            self.attributedPlaceholder = NSAttributedString(
                string: text,
                attributes: [.foregroundColor: newValue ?? UIColor.lightGray]
            )
        }
    }

    /// RCTDirectEventBlock set by React Native for the onFocusChange event.
    @objc var onFocusChange: RCTDirectEventBlock? {
        get {
            return objc_getAssociatedObject(self, &onFocusChangeAssociatedObjectKey) as? RCTDirectEventBlock
        }
        set {
            objc_setAssociatedObject(self, &onFocusChangeAssociatedObjectKey, newValue, .OBJC_ASSOCIATION_COPY_NONATOMIC)
        }
    }
}
