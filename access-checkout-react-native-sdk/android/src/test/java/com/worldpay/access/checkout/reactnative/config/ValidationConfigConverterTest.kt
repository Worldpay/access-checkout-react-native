package com.worldpay.access.checkout.reactnative.config

import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class ValidationConfigConverterTest {

    @Test
    fun shouldConvertMapIntoValidationConfig() {
        val map = JavaOnlyMap()
        map.putString("baseUrl", "some-url")
        map.putString("panId", "some-pan-id")
        map.putString("expiryId", "some-expiry-date-id")
        map.putString("cvcId", "some-cvc-id")
        map.putBoolean("enablePanFormatting", true)

        val cardBrands = JavaOnlyArray()
        cardBrands.pushString("visa")
        cardBrands.pushString("jcb")
        map.putArray("acceptedCardBrands", cardBrands)

        val converter = ValidationConfigConverter()

        val result = converter.fromReadableMap(map)

        assertThat(result.baseUrl).isEqualTo("some-url")
        assertThat(result.panId).isEqualTo("some-pan-id")
        assertThat(result.expiryId).isEqualTo("some-expiry-date-id")
        assertThat(result.cvcId).isEqualTo("some-cvc-id")
        assertThat(result.enablePanFormatting).isTrue
        assertThat(result.acceptedCardBrands).isEqualTo(arrayOf("visa", "jcb"))
    }
}