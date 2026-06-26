package com.worldpay.access.checkout.reactnative.ui

import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.view.inputmethod.InputMethodManager
import com.facebook.react.bridge.*
import com.worldpay.access.checkout.ui.AccessCheckoutEditText
import org.assertj.core.api.AssertionsForClassTypes.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import org.robolectric.Robolectric
import org.robolectric.RobolectricTestRunner
import org.robolectric.Shadows.shadowOf

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

    @Test
    fun `setRTCPlaceholderTextColor() should change the hint text color on AccessEditText`() {
        manager.setRTCPlaceholderTextColor(accessCheckoutEditTextMock, 123)

        verify(accessCheckoutEditTextMock).setHintTextColor(123)
    }

    @Test
    fun `getCommandsMap() should return a map containing focus and blur commands`() {
        val commandsMap = manager.commandsMap

        assertThat(commandsMap.size).isEqualTo(2)
        assertThat(commandsMap["focus"]).isEqualTo(AccessCheckoutTextInputManager.COMMAND_FOCUS)
        assertThat(commandsMap["blur"]).isEqualTo(AccessCheckoutTextInputManager.COMMAND_BLUR)
    }

    @Test
    fun `getExportedCustomDirectEventTypeConstants() should return a map mapping the internal topFocusChange event to an onFocusChange event`() {
        val eventsMap:Map<String, Any?> = manager.exportedCustomDirectEventTypeConstants
        assertThat(eventsMap.size).isEqualTo(1)

        val topFocusChangeEventMap = eventsMap["topFocusChange"] as Map<String, String>
        assertThat(topFocusChangeEventMap.size).isEqualTo(1)
        assertThat(topFocusChangeEventMap["registrationName"]).isEqualTo("onFocusChange")
    }

    @Test
    fun `receiveCommand() with integer COMMAND_FOCUS for classic architecture should request focus and show soft keyboard`() {
        val (view, mockImm) = createViewWithMockInputMethodManager()
        manager.receiveCommand(view, AccessCheckoutTextInputManager.COMMAND_FOCUS, null)
        verify(mockImm).showSoftInput(view, InputMethodManager.SHOW_IMPLICIT)
    }

    @Test
    fun `receiveCommand() with string focus for new architecture should request focus and show soft keyboard`() {
        val (view, mockImm) = createViewWithMockInputMethodManager()
        manager.receiveCommand(view, "focus", null)
        verify(mockImm).showSoftInput(view, InputMethodManager.SHOW_IMPLICIT)
    }

    @Test
    fun `receiveCommand() with integer COMMAND_BLUR for classic architecture should clear focus and hide soft keyboard`() {
        val (view, mockImm) = createViewWithMockInputMethodManager()
        manager.receiveCommand(view, AccessCheckoutTextInputManager.COMMAND_BLUR, null)
        verify(mockImm).hideSoftInputFromWindow(view.windowToken, 0)
    }

    @Test
    fun `receiveCommand() with string blur for new architecture should clear focus and hide soft keyboard`() {
        val (view, mockImm) = createViewWithMockInputMethodManager()
        manager.receiveCommand(view, "blur", null)
        verify(mockImm).hideSoftInputFromWindow(view.windowToken, 0)
    }

    private fun createViewWithMockInputMethodManager(): Pair<AccessCheckoutEditText, InputMethodManager> {
        val mockImm = mock(InputMethodManager::class.java)
        val activity = Robolectric.buildActivity(Activity::class.java).create().get()

        // Replace the system IMM with our mock via the shadow
        shadowOf(activity.application).setSystemService(Context.INPUT_METHOD_SERVICE, mockImm)

        val view = AccessCheckoutEditText(activity)
        activity.setContentView(view)
        return Pair(view, mockImm)
    }
}
