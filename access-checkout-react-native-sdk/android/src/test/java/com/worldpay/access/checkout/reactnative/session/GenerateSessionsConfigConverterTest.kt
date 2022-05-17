package com.worldpay.access.checkout.reactnative.session

import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.worldpay.access.checkout.client.session.model.SessionType
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatIllegalArgumentException
import org.junit.Test
import kotlin.test.assertEquals

class GenerateSessionsConfigConverterTest {
    private val converter = GenerateSessionsConfigConverter()

    @Test
    fun shouldConvertMapIntoValidationConfig() {
        val map = mapWithCardSessionTypesAndValidEntries()

        val config = converter.fromReadableMap(map)

        assertThat(config.baseUrl).isEqualTo("some-base-url")
        assertThat(config.merchantId).isEqualTo("some-merchant-id")
        assertThat(config.panValue).isEqualTo("some-pan-value")
        assertThat(config.expiryDateValue).isEqualTo("some-expiry-date-value")
        assertThat(config.cvcValue).isEqualTo("some-cvc-value")
        assertThat(config.sessionTypes).isEqualTo(listOf(SessionType.CARD))
    }

    @Test
    fun `should throw exception when baseUrl is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("baseUrl", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected baseUrl to be provided but was not")
    }

    @Test
    fun `should throw exception when merchantId is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("merchantId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected merchantId to be provided but was not")
    }

    @Test
    fun `should throw exception when session types contains card and panValue is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("panValue", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected panValue to be provided but was not")
    }

    @Test
    fun `should throw exception when session types contains card and expiryDate is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("expiryDateValue", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected expiryDateValue to be provided but was not")
    }

    @Test
    fun `should throw exception when session types contains card and cvc is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("cvcValue", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcValue to be provided but was not")
    }

    @Test
    fun `should convert map into generateSessionConfig when session type contains card`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        val convert = converter.fromReadableMap(map)

        assertEquals(convert::class.java, GenerateSessionsConfig::class.java)
    }

    @Test
    fun `should throw exception when session types contains cvc and cvc is null`() {
        val map = mapWithCvcSessionTypesAndValidEntries()
        map.putString("cvcValue", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcValue to be provided but was not")
    }

    @Test
    fun `should convert map into generateSessionConfig when session types is cvc only`() {
        val map = mapWithCvcSessionTypesAndValidEntries()
        val convert = converter.fromReadableMap(map)

        assertEquals(convert::class.java, GenerateSessionsConfig::class.java)
    }

    @Test
    fun `should throw exception when sessionTypes is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putArray("sessionTypes", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected sessionTypes to be provided but was not")
    }

    @Test
    fun `should throw exception when sessionTypes is empty`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of())

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected sessionTypes to be provided but was not")
    }

    @Test
    fun `should throw exception when sessionTypes has more than 2 entries`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", "cvc", "other"))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected maximum of 2 session types to be provided but found 3")
    }

    @Test
    fun `should throw exception when sessionTypes has an entry which is not a string`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", 1))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected session type value to be a string but was not")
    }

    @Test
    fun `should throw exception when sessionTypes has an entry which is not recognised`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", "other"))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Unrecognised session type found other, only CARD or CVC is accepted")
    }

    private fun mapWithCardSessionTypesAndValidEntries(): JavaOnlyMap {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-base-url")
        map.putString("merchantId", "some-merchant-id")
        map.putString("panValue", "some-pan-value")
        map.putString("expiryDateValue", "some-expiry-date-value")
        map.putString("cvcValue", "some-cvc-value")
        map.putArray("sessionTypes", JavaOnlyArray.of("card"))
        return map
    }

    private fun mapWithCvcSessionTypesAndValidEntries(): JavaOnlyMap {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-base-url")
        map.putString("merchantId", "some-merchant-id")
        map.putString("cvcValue", "some-cvc-value")
        map.putArray("sessionTypes", JavaOnlyArray.of("cvc"))
        return map
    }
}
