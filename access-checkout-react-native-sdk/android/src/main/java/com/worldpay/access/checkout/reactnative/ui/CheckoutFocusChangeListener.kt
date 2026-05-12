package com.worldpay.access.checkout.reactnative.ui

import FocusChangeEvent
import android.util.Log
import android.view.View
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper


class CheckoutFocusChangeListener : View.OnFocusChangeListener {
    override fun onFocusChange(view: View?, isFocused: Boolean) {
        val targetView = view ?: return
        val reactContext = targetView.context as? ReactContext ?: return

        val surfaceId = UIManagerHelper.getSurfaceId(targetView.context)
        UIManagerHelper.getEventDispatcherForReactTag(reactContext, targetView.id)
            ?.dispatchEvent(FocusChangeEvent(surfaceId, targetView.id, isFocused))

        Log.d("DebugOlivier", "focused = $isFocused-${targetView::class.simpleName}|ID=${targetView.id}")
    }
}
