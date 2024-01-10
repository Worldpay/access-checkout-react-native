package com.worldpay.access.checkout.reactnative.ui

import android.content.Context
import android.content.res.ColorStateList
import android.graphics.Color
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.ReactApplicationContext
import com.worldpay.access.checkout.ui.AccessCheckoutEditText
import org.assertj.core.api.AssertionsForClassTypes.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
internal class AccessCheckoutTextInputManagerTest {
    private val manager = AccessCheckoutTextInputManager(reactApplicationContext())
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
    fun `setRTCPlaceholderTextColor() should call hintTextColor on AccessEditText`() {
        val parsedColor = Color.parseColor("blue")

        manager.setRTCPlaceholderTextColor(accessCheckoutEditTextMock, "blue")

        verify(accessCheckoutEditTextMock).setHintTextColor(parsedColor)
    }

    @Test
    fun `setRTCFontSize() should call textSize on AccessEditText`() {
        manager.setRTCFontSize(accessCheckoutEditTextMock, 12.5)

        verify(accessCheckoutEditTextMock).textSize = 12.5F
    }

    @Test
    fun `setRTCBorderColor() should call setTint on AccessEditText`() {
        manager.setRTCBorderColor(accessCheckoutEditTextMock, Color.BLUE)

        verify(accessCheckoutEditTextMock).background?.setTint(Color.BLUE)
    }

    @Test
    fun `setRTCBorderColor() should call setTint on AccessEditText when the color passed is a string`() {
        val parsedColor = Color.parseColor("blue")

        manager.setRTCBorderColor(accessCheckoutEditTextMock, "blue")

        verify(accessCheckoutEditTextMock).background?.setTint(parsedColor)
    }



    private fun reactApplicationContext(): ReactApplicationContext {
        val applicationContext: Context = ApplicationProvider.getApplicationContext()
        return ReactApplicationContext(applicationContext)
    }
}
