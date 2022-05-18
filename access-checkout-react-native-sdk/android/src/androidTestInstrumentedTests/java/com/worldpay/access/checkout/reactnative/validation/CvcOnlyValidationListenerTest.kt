package com.worldpay.access.checkout.reactnative.validation

import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.react.EventMock
import com.worldpay.access.checkout.reactnative.react.MockReactApplicationContext
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
        SoLoader.init(reactApplicationContext, false)
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
