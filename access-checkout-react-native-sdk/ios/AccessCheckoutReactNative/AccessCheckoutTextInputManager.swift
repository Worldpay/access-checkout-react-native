import AccessCheckoutSDK
import Foundation
import React

@objc(AccessCheckoutTextInputManager)
class AccessCheckoutTextInputManager: RCTViewManager {
    override func view() -> UIView! {
        let textField = AccessCheckoutUITextField()
        // In order to replicate React Native behaviours in both ios and android we need reset
        // the default padding, borders and radius added by AccessCheckoutUITextField
        textField.borderWidth = 0
        textField.cornerRadius = 0
        textField.horizontalPadding = 0

        // Emit onFocusChange event to React Native when the field acquires or loses focus.
        // onFocusChange is declared as RCTDirectEventBlock in the .m file and will be
        // set as a prop by React Native before the listener fires.
        textField.setOnFocusChangedListener { [weak textField] _, hasFocus in
            guard let field = textField, let onFocusChange = field.onFocusChange else { return }
            onFocusChange(["isFocused": hasFocus])
        }

        return textField
    }
    
    func findView(forReactTag node: NSNumber) -> UIView?{
        if let bridge = self.bridge, let uiManager = bridge.uiManager {
            return uiManager.view(forReactTag: node)
        }
        
        return nil
    }

    // MARK: - Commands (focus / blur)
    // Called by the React Native layer when React Native's JS TextInputState sends 'focus' or 'blur' command.
    @objc func focus(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.findView(forReactTag: node) {
                _ = view.becomeFirstResponder()
            }
        }
    }

    @objc func blur(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.findView(forReactTag: node) {
                _ = view.resignFirstResponder()
            }
        }
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
