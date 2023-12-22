import AccessCheckoutSDK
import Foundation
import React

class ReactNativeViewLocator {
    func locateUITextField(id: String) -> AccessCheckoutUITextField? {
        guard let controller: UIViewController = RCTPresentedViewController() else {
            return nil
        }

        let view = self.searchForView(subViews: controller.view!.subviews, nativeId: id)
        return view as? AccessCheckoutUITextField
    }

    private func searchForView(subViews: [UIView], nativeId: String) -> UIView? {
        for subView in subViews {
            if subView.nativeID == nativeId {
                return subView
            } else {
                let view = self.searchForView(subViews: subView.subviews, nativeId: nativeId)
                if view != nil {
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
