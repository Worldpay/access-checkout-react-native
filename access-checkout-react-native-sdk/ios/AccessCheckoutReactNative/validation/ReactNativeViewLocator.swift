import Foundation
import React
import AccessCheckoutSDK

class ReactNativeViewLocator {
    func locateUITextField(id:String) -> UITextField? {
        let controller = RCTPresentedViewController()
        
        return self.searchForView(subViews: controller?.view!.subviews, nativeId: id)
    }
    
    private func searchForView(subViews: [UIView]?, nativeId: String) -> UITextField? {
        if subViews == nil {
            return nil
        }

        for subView in subViews! {
            if subView.nativeID == nil {
                let v = searchForView(subViews: subView.subviews, nativeId: nativeId)
                if v != nil {
                    return v
                }
            } else if subView.nativeID! == nativeId {
                let inputView = (subView as? RCTSinglelineTextInputView)?.backedTextInputView
                return inputView as! UITextField
            }
        }

        return nil
    }
}
