import UIKit

final class UIViewMock : UIView {
    private var _isFirstResponder:Bool = false
    private(set) var becomeFirstResponderCalled:Bool = false
    private(set) var resignFirstResponderCalled:Bool = false

    override var isFirstResponder:Bool {
        get {
            return _isFirstResponder
        }
    }

    override func becomeFirstResponder() -> Bool {
        _isFirstResponder = true
        becomeFirstResponderCalled = true
        return _isFirstResponder
    }

    override func resignFirstResponder() -> Bool {
        _isFirstResponder = false
        resignFirstResponderCalled = true
        return _isFirstResponder
    }
}
