package com.worldpay.access.checkout.reactnative.ui

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewProps
import com.facebook.react.uimanager.annotations.ReactProp
import com.worldpay.access.checkout.ui.AccessCheckoutEditText

class AccessCheckoutInputTextManager(private val callerContext: ReactApplicationContext) :
    SimpleViewManager<AccessCheckoutEditText>() {

    override fun getName() = REACT_CLASS

    companion object {
        const val REACT_CLASS = "AccessCheckoutInputText"
    }

    override fun createViewInstance(context: ThemedReactContext) = AccessCheckoutEditText(context)

    /**
     * Properties
     */
    @ReactProp(name = ViewProps.COLOR)
    fun setRTCTextColor(accessCheckoutEditText: AccessCheckoutEditText, color: Int) {
        accessCheckoutEditText.setTextColor(color)
    }

    @ReactProp(name = "placeholder")
    fun setRTCPlaceholder(accessCheckoutEditText: AccessCheckoutEditText, placeholder: String) {
        accessCheckoutEditText.setHint(placeholder)
    }

    @ReactProp(name = "editable")
    fun setRTCEditable(accessCheckoutEditText: AccessCheckoutEditText, editable: Boolean) {
        accessCheckoutEditText.isEnabled = editable
    }
}
