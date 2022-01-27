package com.worldpay.access.checkout.reactnative.session

import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.worldpay.access.checkout.client.session.model.SessionType
import com.worldpay.access.checkout.reactnative.session.GenerateSessionsConfigConverter
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatIllegalArgumentException
import org.junit.Test

class GenerateSessionsConfigConverterTest {
    private val converter = GenerateSessionsConfigConverter()

    @Test
    fun shouldConvertMapIntoValidationConfig() {
        val map = mapWithValidEntries()

        val config = converter.fromReadableMap(map)

        assertThat(config.baseUrl).isEqualTo("some-base-url")
        assertThat(config.merchantId).isEqualTo("some-merchant-id")
        assertThat(config.panValue).isEqualTo("some-pan-value")
        assertThat(config.expiryValue).isEqualTo("some-expiry-date-value")
        assertThat(config.cvcValue).isEqualTo("some-cvc-value")
        assertThat(config.sessionTypes).isEqualTo(listOf(SessionType.CARD))
    }

    @Test
    fun `should throw exception when baseUrl is null`() {
        val map = mapWithValidEntries()
        map.putString("baseUrl", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected base url to be provided but was not")
    }

    @Test
    fun `should throw exception when merchantId is null`() {
        val map = mapWithValidEntries()
        map.putString("merchantId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected merchant id to be provided but was not")
    }

    @Test
    fun `should throw exception when panValue is null`() {
        val map = mapWithValidEntries()
        map.putString("panValue", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected pan value to be provided but was not")
    }

    @Test
    fun `should throw exception when expiryDateValue is null`() {
        val map = mapWithValidEntries()
        map.putString("expiryValue", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected expiry value to be provided but was not")
    }

    @Test
    fun `should throw exception when cvcValue is null`() {
        val map = mapWithValidEntries()
        map.putString("cvcValue", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvc value to be provided but was not")
    }

    @Test
    fun `should throw exception when sessionTypes is null`() {
        val map = mapWithValidEntries()
        map.putArray("sessionTypes", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected session types to be provided but was not")
    }

    @Test
    fun `should throw exception when sessionTypes is empty`() {
        val map = mapWithValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of())

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected session types to be provided but was not")
    }

    @Test
    fun `should throw exception when sessionTypes has more than 2 entries`() {
        val map = mapWithValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", "cvc", "cvc"))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected maximum of 2 session types to be provided but found 3")
    }

    @Test
    fun `should throw exception when sessionTypes has an entry which is not a string`() {
        val map = mapWithValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", 1))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected session type value to be a string but was not")
    }

    @Test
    fun `should throw exception when sessionTypes has an entry which is not recognised`() {
        val map = mapWithValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", "other"))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Unrecognised session type found other, only CARD or CVC is accepted")
    }

    private fun mapWithValidEntries(): JavaOnlyMap {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-base-url")
        map.putString("merchantId", "some-merchant-id")
        map.putString("panValue", "some-pan-value")
        map.putString("expiryValue", "some-expiry-date-value")
        map.putString("cvcValue", "some-cvc-value")
        map.putArray("sessionTypes", JavaOnlyArray.of("card"))
        return map
    }
}
