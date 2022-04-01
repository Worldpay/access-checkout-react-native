package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class ValidationConfigConverter {

    fun fromReadableMap(readableMap: ReadableMap): ValidationConfig {
        val baseUrl = readableMap.getString("baseUrl")
        val panId = readableMap.getString("panId")
        val expiryDateId = readableMap.getString("expiryDateId")
        val cvcId = readableMap.getString("cvcId")
        val enablePanFormatting = try {
            readableMap.getBoolean("enablePanFormatting")
        } catch (e: RuntimeException) {
            false
        }
        val acceptedCardBrandsReadableArray = readableMap.getArray("acceptedCardBrands")

        validateNotNull(baseUrl, "baseUrl")
        validateNotNull(panId, "panId")
        validateNotNull(expiryDateId, "expiryDateId")
        validateNotNull(cvcId, "cvcId")

        var acceptedCardBrands = emptyArray<String>()
        if (acceptedCardBrandsReadableArray != null) {
            acceptedCardBrands = asArrayList(acceptedCardBrandsReadableArray)
        }

        return ValidationConfig(
            baseUrl = baseUrl as String,
            panId = panId as String,
            expiryDateId = expiryDateId as String,
            cvcId = cvcId as String,
            enablePanFormatting = enablePanFormatting,
            acceptedCardBrands = acceptedCardBrands
        )
    }

    private fun asArrayList(readableArray: ReadableArray): Array<String> {
        val list = ArrayList<String>()
        readableArray.toArrayList().forEachIndexed { _, element ->
            if (element is String) {
                list.add(element)
            } else {
                throw IllegalArgumentException("Expected accepted card brand to be a string but was not")
            }
        }

        return list.toTypedArray()
    }

    private fun validateNotNull(property: Any?, propertyKey: String) {
        if (property == null) {
            throw IllegalArgumentException("Expected $propertyKey to be provided but was not")
        }
    }
}
