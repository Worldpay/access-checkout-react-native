package com.worldpay.access.checkout.reactnative.ui

import android.graphics.Typeface
import android.view.Gravity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewProps
import com.facebook.react.uimanager.annotations.ReactProp
import com.worldpay.access.checkout.ui.AccessCheckoutEditText


class AccessCheckoutTextInputManager(private val callerContext: ReactApplicationContext) :
    SimpleViewManager<AccessCheckoutEditText>() {

    override fun getName() = REACT_CLASS

    companion object {
        const val REACT_CLASS = "AccessCheckoutTextInput"
    }

    override fun createViewInstance(context: ThemedReactContext): AccessCheckoutEditText {
        val accessCheckoutEditText = AccessCheckoutEditText(context)

        // In order to replicate React Native behaviours in both ios and android we need reset
        // the default paddings gravity and background added by Android
        accessCheckoutEditText.background = null
        accessCheckoutEditText.textSize = 14f
        accessCheckoutEditText.setPadding(0, 0, 0, 0)
        accessCheckoutEditText.gravity = Gravity.CENTER

        return accessCheckoutEditText
    }

    /**
     * Properties
     */
    @ReactProp(name = ViewProps.COLOR)
    fun setRTCTextColor(accessCheckoutEditText: AccessCheckoutEditText, color: Int) {
        accessCheckoutEditText.setTextColor(color)
    }

    @ReactProp(name = "font")
    fun setRTCFont(accessCheckoutEditText: AccessCheckoutEditText, font: ReadableMap) {
        if (font.hasKey(ViewProps.FONT_SIZE)) {
            val fontSize = font.getDouble(ViewProps.FONT_SIZE)
            accessCheckoutEditText.textSize = fontSize.toFloat()
        }

        if (font.hasKey(ViewProps.FONT_FAMILY)) {
            val fontSize = font.getString(ViewProps.FONT_FAMILY)
            val typeface = Typeface.create(fontSize, Typeface.NORMAL)
            accessCheckoutEditText.typeface = typeface
        }
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
