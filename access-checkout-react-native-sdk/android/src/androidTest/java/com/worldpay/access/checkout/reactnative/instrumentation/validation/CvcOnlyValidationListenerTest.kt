package com.worldpay.access.checkout.reactnative.instrumentation.validation

import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.ui.react.EventMock
import com.worldpay.access.checkout.reactnative.ui.react.MockReactApplicationContext
import com.worldpay.access.checkout.reactnative.validation.CvcOnlyValidationListener
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test

class CvcOnlyValidationListenerTest {
    private val reactApplicationContext = MockReactApplicationContext(
        InstrumentationRegistry.getInstrumentation().context
    )
    private val listener = CvcOnlyValidationListener(reactApplicationContext)

    @Before
    fun setUp() {
        SoLoader.init(reactApplicationContext, OpenSourceMergedSoMapping)
    }

    @Test
    fun shouldRaiseEventWithCvcValidityStatusWhenCvcBecomesValid() {
        listener.onCvcValidated(isValid = true)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutCvcOnlyValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("cvc")
        assertThat(eventsReceived().first().booleanOf("isValid")).isTrue
    }

    @Test
    fun shouldRaiseEventWithCvcValidityStatusWhenCvcBecomesInvalid() {
        listener.onCvcValidated(isValid = false)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutCvcOnlyValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("cvc")
        assertThat(eventsReceived().first().booleanOf("isValid")).isFalse
    }

    @Test
    fun shouldRaiseEventWithAllValidityStatusWhenAllFieldsBecomesInvalid() {
        listener.onValidationSuccess()

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutCvcOnlyValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("all")
        assertThat(eventsReceived().first().booleanOf("isValid")).isTrue
    }

    private fun eventsReceived(): List<EventMock> {
        return reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted
    }
}
