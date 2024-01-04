package com.worldpay.access.checkout.reactnative.ui

import android.content.Context
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


    private fun reactApplicationContext(): ReactApplicationContext {
        val applicationContext: Context = ApplicationProvider.getApplicationContext()
        return ReactApplicationContext(applicationContext)
    }
}
