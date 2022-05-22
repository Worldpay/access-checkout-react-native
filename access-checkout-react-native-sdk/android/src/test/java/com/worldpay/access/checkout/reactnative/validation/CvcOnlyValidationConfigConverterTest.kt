package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.JavaOnlyMap
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatIllegalArgumentException
import org.junit.Test

class CvcOnlyValidationConfigConverterTest {
    private val converter = CvcOnlyValidationConfigConverter()

    @Test
    fun `should convert map into cvc only validation config`() {
        val map = mapWithValidEntries()

        val config = converter.fromReadableMap(map)

        assertThat(config.cvcId).isEqualTo("some-cvc-id")
    }

    @Test
    fun `should throw exception when cvcId is null`() {
        val map = mapWithValidEntries()
        map.putString("cvcId", null)

        assertThatIllegalArgumentException()
            .isThrownBy { converter.fromReadableMap(map) }
            .withMessage("Expected cvcId to be provided but was not")
    }


    private fun mapWithValidEntries(): JavaOnlyMap {
        val map = JavaOnlyMap()
        map.putString("cvcId", "some-cvc-id")
        return map
    }
}
