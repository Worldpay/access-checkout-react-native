//import UIKit
//import AccessCheckoutSDK
//
//class AccessCheckoutEditTextView: UIView{
//
//    public var editTextField: PocAccessCheckoutUITextField! = PocAccessCheckoutUITextField()
//    
//    override init(frame: CGRect) {
//        super.init(frame: frame)
//        setup();
//        
//    }
//    
//    required init?(coder aDecoder: NSCoder) {
//        super.init(coder: aDecoder)
//        setup();
//    }
//
//    private func setup() {
//        editTextField.autoresizingMask = [
//            UIView.AutoresizingMask.flexibleWidth,
//            UIView.AutoresizingMask.flexibleHeight
//        ]
//        self.addSubview(editTextField)
//    }
//
//    @objc
//    var placeholder: String? {
//        didSet{
//            editTextField.placeholder = placeholder
//        }
//    }
//    
//}
