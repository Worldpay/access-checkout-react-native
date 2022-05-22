package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class CvcOnlyValidationConfigConverter {

    fun fromReadableMap(readableMap: ReadableMap): CvcOnlyValidationConfig {
        val cvcId = readableMap.getString("cvcId")

        validateNotNull(cvcId, "cvcId")

        return CvcOnlyValidationConfig(
            cvcId = cvcId as String,
        )
    }

    private fun validateNotNull(property: Any?, propertyKey: String) {
        if (property == null) {
            throw IllegalArgumentException("Expected $propertyKey to be provided but was not")
        }
    }
}
