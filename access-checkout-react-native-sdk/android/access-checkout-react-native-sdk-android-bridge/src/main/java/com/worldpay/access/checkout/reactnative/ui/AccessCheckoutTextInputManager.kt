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
    @ReactProp(name = ViewProps.COLOR, customType = "Color")
    fun setRTCTextColor(accessCheckoutEditText: AccessCheckoutEditText, color: Int) {
        accessCheckoutEditText.setTextColor(color)
    }

    @ReactProp(name = "font")
    fun setRTCFont(accessCheckoutEditText: AccessCheckoutEditText, font: ReadableMap) {
        println("---> Setting font for ${accessCheckoutEditText.id}")
        println("---> [${accessCheckoutEditText.id}] $font")

        if (font.hasKey(ViewProps.FONT_SIZE)) {
            println("---> [${accessCheckoutEditText.id}] Found Font size")
            val fontSize: Float = font.getDouble(ViewProps.FONT_SIZE).toFloat()
            println("---> [${accessCheckoutEditText.id}] $fontSize")
            accessCheckoutEditText.textSize = fontSize
        }

        val isBold =
            font.hasKey(ViewProps.FONT_WEIGHT) && "bold" == font.getString(ViewProps.FONT_WEIGHT)
        val isItalic =
            font.hasKey(ViewProps.FONT_STYLE) && "italic" == font.getString(ViewProps.FONT_STYLE)
        println("---> [${accessCheckoutEditText.id}] Font Style")
        println("---> [${accessCheckoutEditText.id}] isBold: $isBold")
        println("---> [${accessCheckoutEditText.id}] isItalic: $isItalic")

        val fontStyle: Int = when {
            isBold && isItalic -> Typeface.BOLD_ITALIC
            isBold -> Typeface.BOLD
            isItalic -> Typeface.ITALIC
            else -> Typeface.NORMAL
        }
        println("---> [${accessCheckoutEditText.id}] result: $fontStyle")
        println("---> [${accessCheckoutEditText.id}] fontFamily: ${font.getString(ViewProps.FONT_FAMILY)}")

        // If the font family is null or unsupported, a default one will be used
        accessCheckoutEditText.typeface =
            Typeface.create(font.getString(ViewProps.FONT_FAMILY), fontStyle)
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
