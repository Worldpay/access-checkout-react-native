package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatIllegalArgumentException
import org.junit.Test

class CardCardCardValidationConfigConverterTest {
    private val converter = CardValidationConfigConverter()

    @Test
    fun `should convert map into validation config`() {
        val map = mapWithValidEntries()

        val config = converter.fromReadableMap(map)

        assertThat(config.baseUrl).isEqualTo("some-url")
        assertThat(config.panId).isEqualTo("some-pan-id")
        assertThat(config.expiryDateId).isEqualTo("some-expiry-date-id")
        assertThat(config.cvcId).isEqualTo("some-cvc-id")
        assertThat(config.enablePanFormatting).isTrue
        assertThat(config.acceptedCardBrands).isEqualTo(arrayOf("visa", "jcb"))
    }

    @Test
    fun `should disable pan formatting by default when enablePanFormatting is not provided`() {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-url")
        map.putString("panId", "some-pan-id")
        map.putString("expiryDateId", "some-expiry-date-id")
        map.putString("cvcId", "some-cvc-id")

        val config = converter.fromReadableMap(map)

        assertThat(config.enablePanFormatting).isFalse
    }

    @Test
    fun `should have an empty list of accepted card brands when acceptedCardBrands is not provided`() {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-url")
        map.putString("panId", "some-pan-id")
        map.putString("expiryDateId", "some-expiry-date-id")
        map.putString("cvcId", "some-cvc-id")

        val config = converter.fromReadableMap(map)

        assertThat(config.acceptedCardBrands).isEmpty()
    }

    @Test
    fun `should throw exception when baseUrl is null`() {
        val map = mapWithValidEntries()
        map.putString("baseUrl", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected baseUrl to be provided but was not")
    }

    @Test
    fun `should throw exception when panId is null`() {
        val map = mapWithValidEntries()
        map.putString("panId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected panId to be provided but was not")
    }

    @Test
    fun `should throw exception when expiryDateId is null`() {
        val map = mapWithValidEntries()
        map.putString("expiryDateId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected expiryDateId to be provided but was not")
    }

    @Test
    fun `should throw exception when cvcId is null`() {
        val map = mapWithValidEntries()
        map.putString("cvcId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be provided but was not")
    }

    @Test
    fun `should throw exception when acceptedCardBrands has an entry which is not a string`() {
        val map = mapWithValidEntries()
        map.putArray("acceptedCardBrands", JavaOnlyArray.of("visa", 1))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected accepted card brand to be a string but was not")
    }

    private fun mapWithValidEntries(): JavaOnlyMap {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-url")
        map.putString("panId", "some-pan-id")
        map.putString("expiryDateId", "some-expiry-date-id")
        map.putString("cvcId", "some-cvc-id")
        map.putBoolean("enablePanFormatting", true)
        map.putArray("acceptedCardBrands", JavaOnlyArray.of("visa", "jcb"))
        return map
    }
}