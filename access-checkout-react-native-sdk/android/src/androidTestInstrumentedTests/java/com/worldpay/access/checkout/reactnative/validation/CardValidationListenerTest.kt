package com.worldpay.access.checkout.reactnative.validation

import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.client.validation.model.CardBrand
import com.worldpay.access.checkout.client.validation.model.CardBrandImage
import com.worldpay.access.checkout.reactnative.react.EventMock
import com.worldpay.access.checkout.reactnative.react.MockReactApplicationContext
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test

class CardValidationListenerTest {
    private val reactApplicationContext = MockReactApplicationContext(
        InstrumentationRegistry.getInstrumentation().context
    )
    private val listener = CardValidationListener(reactApplicationContext)

    @Before
    fun setUp() {
        SoLoader.init(reactApplicationContext, false)
    }

    @Test
    fun shouldRaiseEventWithNullBrandWhenBrandIsNotRecognised() {
        listener.onBrandChange(null)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("brand")
        assertThat(eventsReceived().first().stringOf("value")).isNull()
    }

    @Test
    fun shouldRaiseEventWithBrandDetailsWhenBrandIsRecognised() {
        val cardBrand = CardBrand(
            name = "visa",
            images = listOf(
                CardBrandImage(type = "type-1", url = "url-1"),
                CardBrandImage(type = "type-2", url = "url-2")
            )
        )

        listener.onBrandChange(cardBrand)

        assertThat(eventsReceived().size).isEqualTo(1)
        val event = eventsReceived().first()
        assertThat(event.name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(event.stringOf("type")).isEqualTo("brand")

        val value = event.mapOf("value")
        assertThat(value?.getString("name")).isEqualTo("visa")
        assertThat(value?.getArray("images")?.getMap(0)?.getString("type")).isEqualTo("type-1")
        assertThat(value?.getArray("images")?.getMap(0)?.getString("url")).isEqualTo("url-1")
        assertThat(value?.getArray("images")?.getMap(1)?.getString("type")).isEqualTo("type-2")
        assertThat(value?.getArray("images")?.getMap(1)?.getString("url")).isEqualTo("url-2")
    }

    @Test
    fun shouldRaiseEventWithPanValidityStatusWhenPanBecomesValid() {
        listener.onPanValidated(isValid = true)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("pan")
        assertThat(eventsReceived().first().booleanOf("isValid")).isTrue
    }

    @Test
    fun shouldRaiseEventWithPanValidityStatusWhenPanBecomesInvalid() {
        listener.onPanValidated(isValid = false)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("pan")
        assertThat(eventsReceived().first().booleanOf("isValid")).isFalse
    }

    @Test
    fun shouldRaiseEventWithExpiryDateValidityStatusWhenExpiryDateBecomesValid() {
        listener.onExpiryDateValidated(isValid = true)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("expiry")
        assertThat(eventsReceived().first().booleanOf("isValid")).isTrue
    }

    @Test
    fun shouldRaiseEventWithExpiryDateValidityStatusWhenExpiryDateBecomesInvalid() {
        listener.onExpiryDateValidated(isValid = false)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("expiry")
        assertThat(eventsReceived().first().booleanOf("isValid")).isFalse
    }

    @Test
    fun shouldRaiseEventWithCvcValidityStatusWhenCvcBecomesValid() {
        listener.onCvcValidated(isValid = true)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("cvc")
        assertThat(eventsReceived().first().booleanOf("isValid")).isTrue
    }

    @Test
    fun shouldRaiseEventWithCvcValidityStatusWhenCvcBecomesInvalid() {
        listener.onCvcValidated(isValid = false)

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("cvc")
        assertThat(eventsReceived().first().booleanOf("isValid")).isFalse
    }

    @Test
    fun shouldRaiseEventWithAllValidityStatusWhenAllFieldsBecomesInvalid() {
        listener.onValidationSuccess()

        assertThat(eventsReceived().size).isEqualTo(1)
        assertThat(eventsReceived().first().name).isEqualTo("AccessCheckoutValidationEvent")
        assertThat(eventsReceived().first().stringOf("type")).isEqualTo("all")
        assertThat(eventsReceived().first().booleanOf("isValid")).isTrue
    }

    private fun eventsReceived(): List<EventMock> {
        return reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted
    }
}