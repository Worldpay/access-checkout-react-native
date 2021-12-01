package com.worldpay.access.checkout.reactnative.config

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class ValidationConfig(
        val baseUrl: String,
        val panId: String,
        val expiryId: String,
        val cvcId: String,
        val enablePanFormatting: Boolean,
        val acceptedCardBrands: Array<String>
)

class ValidationConfigConverter {

    fun fromReadableMap(readableMap: ReadableMap) : ValidationConfig {
        val baseUrl = readableMap.getString("baseUrl")
        val panId = readableMap.getString("panId")
        val expiryId = readableMap.getString("expiryId")
        val cvcId = readableMap.getString("cvcId")
        val enablePanFormatting = readableMap.getBoolean("enablePanFormatting")
        val acceptedCardBrandsReadableArray = readableMap.getArray("acceptedCardBrands")

        validateNotNull(baseUrl, "base url")
        validateNotNull(panId, "pan id")
        validateNotNull(expiryId, "expiry id")
        validateNotNull(cvcId, "cvc id")

        var acceptedCardBrands = emptyArray<String>()
        if (acceptedCardBrandsReadableArray != null) {
            acceptedCardBrands = asArrayList(acceptedCardBrandsReadableArray)
        }

        return ValidationConfig(
                baseUrl = baseUrl as String,
                panId = panId as String,
                expiryId = expiryId as String,
                cvcId = cvcId as String,
                enablePanFormatting = enablePanFormatting,
                acceptedCardBrands = acceptedCardBrands
        )
    }

    private fun asArrayList(readableArray: ReadableArray): Array<String> {
        val array = emptyArray<String>()
        readableArray.toArrayList().forEachIndexed { index, element ->
            if (element is String) {
                array[index] = element
            } else {
                throw IllegalArgumentException("Expected string value in array to be provided but was not")
            }
        }
        return array
    }

    private fun validateNotNull(property: Any?, propertyKey: String) {
        if (property == null) {
            throw IllegalArgumentException("Expected $propertyKey to be provided but was not")
        }
    }
}
