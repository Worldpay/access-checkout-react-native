package com.worldpay.access.checkout.reactnative.ui

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.*
import com.worldpay.access.checkout.ui.AccessCheckoutEditText
import org.assertj.core.api.AssertionsForClassTypes.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
internal class AccessCheckoutTextInputManagerTest {
    private val manager = AccessCheckoutTextInputManager()
    private val accessCheckoutEditTextMock = mock(AccessCheckoutEditText::class.java)

    @Test
    fun `getName() should return the name of the react class`() {
        val expectedName = "AccessCheckoutTextInput"

        assertThat(manager.name).isEqualTo(expectedName)
    }

    @Test
    fun `setRTCTextColour() should call setTextColour on AccessEditText`() {
        manager.setRTCTextColor(accessCheckoutEditTextMock, Color.RED)

        verify(accessCheckoutEditTextMock).setTextColor(Color.RED)
    }

    @Test
    fun `setRTCPlaceholder() should call setHint on AccessEditText`() {
        manager.setRTCPlaceholder(accessCheckoutEditTextMock, "placeholder")

        verify(accessCheckoutEditTextMock).setHint("placeholder")
    }

    @Test
    fun `setRTCEditable() should call isEnabled on AccessEditText`() {
        manager.setRTCEditable(accessCheckoutEditTextMock, true)

        verify(accessCheckoutEditTextMock).isEnabled = true
    }

    @Test
    fun `setRTCFont() should call textSize and typeface on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putDouble("fontSize", 12.1)
        fontMap.putString("fontFamily", "sans-serif")

        val typeface = Typeface.create("sans-serif", Typeface.NORMAL)

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        verify(accessCheckoutEditTextMock).textSize = 12.1F
        verify(accessCheckoutEditTextMock).typeface = typeface
    }

    @Test
    fun `setRTCFont() should use a default typeface on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)
        verify(accessCheckoutEditTextMock).typeface = Typeface.DEFAULT
    }


    @Test
    fun `setRTCFont() should call textSize on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putDouble("fontSize", 12.1)

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        verify(accessCheckoutEditTextMock).textSize = 12.1F
    }

    @Test
    fun `setRTCFont() should change the font family on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putString("fontFamily", "Rubik")

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        verify(accessCheckoutEditTextMock).typeface = Typeface.create("Rubik", Typeface.NORMAL)
    }


    @Test
    fun `setRTCFont() should change the font to italic on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putString("fontFamily", "Rubik")
        fontMap.putString("fontStyle", "italic")

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        verify(accessCheckoutEditTextMock).typeface = Typeface.create("Rubik", Typeface.ITALIC)
    }


    @Test
    fun `setRTCFont() should change the font to bold on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putString("fontFamily", "Rubik")
        fontMap.putString("fontWeight", "bold")

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        verify(accessCheckoutEditTextMock).typeface = Typeface.create("Rubik", Typeface.BOLD)
    }

    @Test
    fun `setRTCFont() should change the font italic bold on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putString("fontFamily", "Rubik")
        fontMap.putString("fontStyle", "italic")
        fontMap.putString("fontWeight", "bold")

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        verify(accessCheckoutEditTextMock).typeface = Typeface.create("Rubik", Typeface.BOLD_ITALIC)
    }


    @Test
    fun `setRTCFont() should change the font weight on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putString("fontFamily", "Rubik")
        fontMap.putString("fontWeight", "100")

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        val expectedTypeface =  Typeface.create("Rubik", Typeface.NORMAL);
        verify(accessCheckoutEditTextMock).typeface = Typeface.create(expectedTypeface, 100, false)
    }


    @Test
    fun `setRTCFont() should change the font weight and italic on AccessEditText`() {
        val fontMap = JavaOnlyMap()
        fontMap.putString("fontFamily", "Rubik")
        fontMap.putString("fontStyle", "italic")
        fontMap.putString("fontWeight", "100")

        manager.setRTCFont(accessCheckoutEditTextMock, fontMap)

        val expectedTypeface =  Typeface.create("Rubik", Typeface.NORMAL);
        verify(accessCheckoutEditTextMock).typeface = Typeface.create(expectedTypeface, 100, true)
    }
}
