package com.worldpay.access.checkout.reactnative.ui

import android.view.View
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.EventDispatcher
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.mock
import org.mockito.Mockito.mockStatic
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
internal class CheckoutFocusChangeListenerTest {

    private val listener = CheckoutFocusChangeListener()

    @Test
    fun `onFocusChange() should dispatch FocusChangeEvent with isFocused=true when view gains focus`() {
        val reactContextMock = mock(ReactContext::class.java)
        val viewMock = mock(View::class.java)
        val eventDispatcherMock = mock(EventDispatcher::class.java)

        `when`(viewMock.context).thenReturn(reactContextMock)
        `when`(viewMock.id).thenReturn(42)

        mockStatic(UIManagerHelper::class.java).use { uiManagerMock ->
            uiManagerMock.`when`<Int> { UIManagerHelper.getSurfaceId(reactContextMock) }.thenReturn(1)
            uiManagerMock.`when`<EventDispatcher?> {
                UIManagerHelper.getEventDispatcherForReactTag(reactContextMock, 42)
            }.thenReturn(eventDispatcherMock)

            listener.onFocusChange(viewMock, true)

            val captor = ArgumentCaptor.forClass(FocusChangeEvent::class.java)
            verify(eventDispatcherMock).dispatchEvent(captor.capture())

            val event = captor.value
            assertThat(event.isFocused).isTrue()
            assertThat(event.eventName).isEqualTo("topFocusChange")
        }
    }

    @Test
    fun `onFocusChange() should dispatch FocusChangeEvent with isFocused=false when view loses focus`() {
        val reactContextMock = mock(ReactContext::class.java)
        val viewMock = mock(View::class.java)
        val eventDispatcherMock = mock(EventDispatcher::class.java)

        `when`(viewMock.context).thenReturn(reactContextMock)
        `when`(viewMock.id).thenReturn(42)

        mockStatic(UIManagerHelper::class.java).use { uiManagerMock ->
            uiManagerMock.`when`<Int> { UIManagerHelper.getSurfaceId(reactContextMock) }.thenReturn(1)
            uiManagerMock.`when`<EventDispatcher?> {
                UIManagerHelper.getEventDispatcherForReactTag(reactContextMock, 42)
            }.thenReturn(eventDispatcherMock)

            listener.onFocusChange(viewMock, false)

            val captor = ArgumentCaptor.forClass(FocusChangeEvent::class.java)
            verify(eventDispatcherMock).dispatchEvent(captor.capture())

            val event = captor.value
            assertThat(event.isFocused).isFalse()
            assertThat(event.eventName).isEqualTo("topFocusChange")
        }
    }
}
