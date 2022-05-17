package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class CvcOnlyValidationConfigConverter {

    fun fromReadableMap(readableMap: ReadableMap): CvcOnlyValidationConfig {
        val baseUrl = readableMap.getString("baseUrl")
        val cvcId = readableMap.getString("cvcId")

        validateNotNull(baseUrl, "baseUrl")
        validateNotNull(cvcId, "cvcId")

        return CvcOnlyValidationConfig(
            baseUrl = baseUrl as String,
            cvcId = cvcId as String,
        )
    }

    private fun validateNotNull(property: Any?, propertyKey: String) {
        if (property == null) {
            throw IllegalArgumentException("Expected $propertyKey to be provided but was not")
        }
    }
}
