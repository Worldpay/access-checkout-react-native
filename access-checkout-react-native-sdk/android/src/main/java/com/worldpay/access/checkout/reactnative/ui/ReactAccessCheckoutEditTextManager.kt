package com.worldpay.access.checkout.reactnative.ui

import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.widget.EditText
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewProps
import com.facebook.react.uimanager.annotations.ReactProp
import com.worldpay.access.checkout.ui.AccessCheckoutEditText

class ReactAccessCheckoutEditTextManager(private val callerContext: ReactApplicationContext) :
    SimpleViewManager<AccessCheckoutEditText>() {

    override fun getName() = REACT_CLASS

    companion object {
        const val REACT_CLASS = "AccessCheckoutEditText"
        const val REACT_NATIVE_EVENT = "AccessCheckoutEditTextChange"
    }

    override fun createViewInstance(context: ThemedReactContext): AccessCheckoutEditText {
        val accessCheckoutEditText = AccessCheckoutEditText(context)

        enableTextChangedListener(context, accessCheckoutEditText)

        return accessCheckoutEditText
    }

    @ReactProp(name = ViewProps.COLOR)
    fun setRTCTextColor(accessCheckoutEditText: AccessCheckoutEditText, color: Int) {
        accessCheckoutEditText.setTextColor(color)
    }

    @ReactProp(name = "value")
    fun setRTCText(accessCheckoutEditText: AccessCheckoutEditText, text: String) {
        accessCheckoutEditText.setText(text)
    }

    @ReactProp(name = "placeholder")
    fun setRTCPlaceholder(accessCheckoutEditText: AccessCheckoutEditText, placeholder: String) {
        accessCheckoutEditText.setHint(placeholder)
    }

    @ReactProp(name = "editable")
    fun setRTCEditable(accessCheckoutEditText: AccessCheckoutEditText, editable: Boolean) {
        accessCheckoutEditText.isEnabled = editable
    }

    @ReactProp(name = "keyboardType")
    fun setRTCKeyboardType(accessCheckoutEditText: AccessCheckoutEditText, keyboardType: String) {
        accessCheckoutEditText.inputType = mapKeyboardTypeToInputType(keyboardType)
    }

    private fun mapKeyboardTypeToInputType(keyboardType: String): Int {
        return when (keyboardType) {
            "numeric" -> InputType.TYPE_CLASS_NUMBER
            else -> InputType.TYPE_CLASS_NUMBER
        }
    }

    private fun enableTextChangedListener(context: ThemedReactContext, accessCheckoutEditText: AccessCheckoutEditText) {
        val editText = accessCheckoutEditText.getChildAt(0) as EditText

        editText.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                // The function is an intentionally-blank override
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                val event = Arguments.createMap().apply {
                    putString("text", s?.toString())
                }
                val reactContext = context as ReactContext
                reactContext
                    .getJSModule(RCTDeviceEventEmitter::class.java)
                    .emit(REACT_NATIVE_EVENT, event)
            }

            override fun afterTextChanged(s: Editable?) {
                // The function is an intentionally-blank override
            }
        })
    }

}
