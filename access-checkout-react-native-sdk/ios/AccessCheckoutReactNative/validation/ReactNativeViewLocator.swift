import AccessCheckoutSDK
import Foundation
import React

class ReactNativeViewLocator {
    
    //TODO: Decide if we want to a generic view like AccessCheckoutEditTextView or generics and specific views like
    //locateUITextField("cvcInput", PanFieldView)
    func locateUITextField(id: String) -> UITextField? {
        guard let controller: UIViewController = RCTPresentedViewController() else {
            return nil
        }

        var view =  self.searchForView(subViews: controller.view!.subviews, nativeId: id)
        let inputView = (view as? RCTSinglelineTextInputView)?.backedTextInputView
        return inputView as? UITextField
    }

    func locateUITextFieldPOC(id: String) -> AccessCheckoutUITextField? {
        guard let controller: UIViewController = RCTPresentedViewController() else {
            return nil
        }

        var view =  self.searchForView(subViews: controller.view!.subviews, nativeId: id)
        return view as? AccessCheckoutUITextField
    }
    
    private func searchForView(subViews: [UIView], nativeId: String) -> UIView? {
        for subView in subViews {
            if (subView.nativeID == nativeId) {
                return subView;
            } else {
                let view = searchForView(subViews: subView.subviews, nativeId: nativeId)
                if (view != nil){
                    return view
                }
            }
        }
        return nil
    }

    func locateUIView(view: UIViewController?, id: String) -> UIView? {
        guard let controller = view else {
            return nil
        }

        return self.searchForView(subViews: controller.view!.subviews, nativeId: id)
    }
}
