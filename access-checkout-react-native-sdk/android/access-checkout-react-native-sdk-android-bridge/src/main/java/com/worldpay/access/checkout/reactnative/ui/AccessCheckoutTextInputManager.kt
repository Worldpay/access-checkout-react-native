package com.worldpay.access.checkout.reactnative.ui

import android.graphics.Typeface
import android.os.Build
import android.view.Gravity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewProps
import com.facebook.react.uimanager.annotations.ReactProp
import com.worldpay.access.checkout.ui.AccessCheckoutEditText
import java.lang.reflect.Type


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
        var customTypeface = Typeface.DEFAULT
        var fontWeightProvidedAsUnit = false;

        if (font.hasKey(ViewProps.FONT_SIZE)) {
            val fontSize: Float = font.getDouble(ViewProps.FONT_SIZE).toFloat()
            accessCheckoutEditText.textSize = fontSize
        }

        if (font.hasKey(ViewProps.FONT_WEIGHT)) {
            fontWeightProvidedAsUnit = when (font.getString(ViewProps.FONT_WEIGHT)) {
                "bold", "normal" -> false
                else -> true
            }
        }

        val bold = isBold(font)
        val italic = isItalic(font)

        val fontStyle: Int = when {
            bold && italic -> Typeface.BOLD_ITALIC
            bold -> Typeface.BOLD
            italic -> Typeface.ITALIC
            else -> Typeface.NORMAL
        }

        // Always attempt to get Font family if the font family is null or unsupported, a default one will be used
        customTypeface = Typeface.create(font.getString(ViewProps.FONT_FAMILY), fontStyle)

        // Font Weight only supported in API >28
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P && fontWeightProvidedAsUnit) {
            val fontAsString = font.getString(ViewProps.FONT_WEIGHT)
            // Note: This default should never happen as we use fontWeightProvidedAsUnit as a check
            // but to avoid a compilation false positive we default to 400 which should be the regular for fonts.
            // Also: Using font.getInt() seems to cause a casting issue where it casts tries to cast a String to a Double, which makes the app crash.
            val fontWeightNumber = fontAsString?.toInt() ?: 400
            customTypeface = Typeface.create(customTypeface, fontWeightNumber, italic)
        }

        accessCheckoutEditText.typeface = customTypeface;
    }

    private fun isItalic(font: ReadableMap): Boolean {
        return font.hasKey(ViewProps.FONT_STYLE) && "italic" == font.getString(ViewProps.FONT_STYLE)
    }

    private fun isBold(font: ReadableMap): Boolean {
        return font.hasKey(ViewProps.FONT_WEIGHT) && "bold" == font.getString(ViewProps.FONT_WEIGHT)
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

