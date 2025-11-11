import AccessCheckoutSDK

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
}
