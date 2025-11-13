package com.worldpay.access.checkout.reactnative.session

import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.worldpay.access.checkout.client.session.model.SessionType
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatIllegalArgumentException
import org.junit.Test

class GenerateSessionsConfigConverterTest {
    private val converter = GenerateSessionsConfigConverter()

    @Test
    fun shouldConvertMapIntoValidationConfig() {
        val map = mapWithCardSessionTypesAndValidEntries()

        val config = converter.fromReadableMap(map)

        assertThat(config.baseUrl).isEqualTo("some-base-url")
        assertThat(config.merchantId).isEqualTo("some-merchant-id")
        assertThat(config.panId).isEqualTo("some-pan-value")
        assertThat(config.expiryDateId).isEqualTo("some-expiry-date-value")
        assertThat(config.cvcId).isEqualTo("some-cvc-value")
        assertThat(config.sessionTypes).isEqualTo(listOf(SessionType.CARD))
        assertThat(config.reactNativeSdkVersion).isEqualTo("1.2.3")
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
    fun `should throw exception when baseUrl is not a String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putInt("baseUrl", 1)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected baseUrl to be a String but was not")
    }

    @Test
    fun `should throw exception when baseUrl is an empty String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("baseUrl", "")

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected baseUrl to be a non-empty String but was empty")
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
    fun `should throw exception when merchantId is not a String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putInt("merchantId", 1)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected merchantId to be a String but was not")
    }

    @Test
    fun `should throw exception when merchantId is an empty String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("merchantId", "")

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected merchantId to be a non-empty String but was empty")
    }

    @Test
    fun `should throw exception when session types contains card and panId is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("panId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected panId to be provided but was not")
    }

    @Test
    fun `should throw exception when session types contains card and panId is not a String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putInt("panId", 1)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected panId to be a String but was not")
    }

    @Test
    fun `should throw exception when session types contains card and panId is an empty String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("panId", "")

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected panId to be a non-empty String but was empty")
    }

    @Test
    fun `should throw exception when session types contains card and expiryDate is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("expiryDateId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected expiryDateId to be provided but was not")
    }

    @Test
    fun `should throw exception when session types contains card and expiryDateId is not a String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putInt("expiryDateId", 1)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected expiryDateId to be a String but was not")
    }

    @Test
    fun `should throw exception when session types contains card and expiryDateId is an empty String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("expiryDateId", "")

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected expiryDateId to be a non-empty String but was empty")
    }

    @Test
    fun `should throw exception when session types contains card and cvcId is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("cvcId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be provided but was not")
    }

    @Test
    fun `should throw exception when session types contains card and cvcId is not a String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putInt("cvcId", 1)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be a String but was not")
    }

    @Test
    fun `should throw exception when session types contains card and cvcId is an empty String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("cvcId", "")

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be a non-empty String but was empty")
    }

    @Test
    fun `should convert map into generateSessionConfig when session type contains card`() {
        val map = mapWithCardSessionTypesAndValidEntries()

        val config: GenerateSessionsConfig = converter.fromReadableMap(map)

        assertThat(config.baseUrl).isEqualTo("some-base-url")
        assertThat(config.merchantId).isEqualTo("some-merchant-id")
        assertThat(config.panId).isEqualTo("some-pan-value")
        assertThat(config.expiryDateId).isEqualTo("some-expiry-date-value")
        assertThat(config.cvcId).isEqualTo("some-cvc-value")
        assertThat(config.sessionTypes).isEqualTo(listOf(SessionType.CARD))
        assertThat(config.reactNativeSdkVersion).isEqualTo("1.2.3")
    }

    @Test
    fun `should throw exception when session types contains cvc and cvc is null`() {
        val map = mapWithCvcSessionTypesAndValidEntries()
        map.putString("cvcId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be provided but was not")
    }

    @Test
    fun `should throw exception when session types contains cvc and cvcId is not a String`() {
        val map = mapWithCvcSessionTypesAndValidEntries()
        map.putInt("cvcId", 1)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be a String but was not")
    }

    @Test
    fun `should throw exception when session types contains cvc and cvcId is an empty String`() {
        val map = mapWithCvcSessionTypesAndValidEntries()
        map.putString("cvcId", "")

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be a non-empty String but was empty")
    }

    @Test
    fun `should convert map into generateSessionConfig when session types is cvc only`() {
        val map = mapWithCvcSessionTypesAndValidEntries()

        val config: GenerateSessionsConfig = converter.fromReadableMap(map)

        assertThat(config.baseUrl).isEqualTo("some-base-url")
        assertThat(config.merchantId).isEqualTo("some-merchant-id")
        assertThat(config.cvcId).isEqualTo("some-cvc-value")
        assertThat(config.sessionTypes).isEqualTo(listOf(SessionType.CVC))
        assertThat(config.reactNativeSdkVersion).isEqualTo("1.2.3")
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
            .withMessage("Expected maximum of 2 session types but found 3")
    }

    @Test
    fun `should throw exception when sessionTypes has an entry which is not a string`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", 1))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected session type value to be a String but was not")
    }

    @Test
    fun `should throw exception when sessionTypes has an entry which is not recognised`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putArray("sessionTypes", JavaOnlyArray.of("card", "other"))

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Unrecognised session type 'other', only CARD or CVC accepted")
    }

    @Test
    fun `should throw exception when ACO React Native Sdk Version is null`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("reactNativeSdkVersion", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected reactNativeSdkVersion to be provided but was not")
    }

    @Test
    fun `should throw exception when ACO React Native Sdk Version is an empty String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putString("reactNativeSdkVersion", "")

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected reactNativeSdkVersion to be a non-empty String but was empty")
    }

    @Test
    fun `should throw exception when ACO React Native Sdk Version is not a String`() {
        val map = mapWithCardSessionTypesAndValidEntries()
        map.putInt("reactNativeSdkVersion", 1)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected reactNativeSdkVersion to be a String but was not")
    }

    private fun mapWithCardSessionTypesAndValidEntries(): JavaOnlyMap {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-base-url")
        map.putString("merchantId", "some-merchant-id")
        map.putString("panId", "some-pan-value")
        map.putString("expiryDateId", "some-expiry-date-value")
        map.putString("cvcId", "some-cvc-value")
        map.putArray("sessionTypes", JavaOnlyArray.of("card"))
        map.putString("reactNativeSdkVersion", "1.2.3")
        return map
    }

    private fun mapWithCvcSessionTypesAndValidEntries(): JavaOnlyMap {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-base-url")
        map.putString("merchantId", "some-merchant-id")
        map.putString("cvcId", "some-cvc-value")
        map.putArray("sessionTypes", JavaOnlyArray.of("cvc"))
        map.putString("reactNativeSdkVersion", "1.2.3")
        return map
    }
}
