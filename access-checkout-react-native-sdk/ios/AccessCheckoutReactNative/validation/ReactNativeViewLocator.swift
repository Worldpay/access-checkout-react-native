import AccessCheckoutSDK
import Foundation
import React

class ReactNativeViewLocator {
    func locateUITextField(id: String) -> UITextField? {
        guard let controller: UIViewController = RCTPresentedViewController() else {
            return nil
        }

        return self.searchForView(subViews: controller.view!.subviews, nativeId: id)
    }

    private func searchForView(subViews: [UIView], nativeId: String) -> UITextField? {
        for subView in subViews {
            if subView.nativeID == nil {
                if let view = searchForView(subViews: subView.subviews, nativeId: nativeId) {
                    return view
                }
            } else if subView.nativeID! == nativeId {
                let inputView = (subView as? RCTSinglelineTextInputView)?.backedTextInputView
                return inputView as? UITextField
            }
        }

        return nil
    }
}
