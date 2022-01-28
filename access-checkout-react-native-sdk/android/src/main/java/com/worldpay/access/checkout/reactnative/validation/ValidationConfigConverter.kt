package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class ValidationConfigConverter {

    fun fromReadableMap(readableMap: ReadableMap): ValidationConfig {
        val baseUrl = readableMap.getString("baseUrl")
        val panId = readableMap.getString("panId")
        val expiryId = readableMap.getString("expiryId")
        val cvcId = readableMap.getString("cvcId")
        val enablePanFormatting = try {
            readableMap.getBoolean("enablePanFormatting")
        } catch (e: RuntimeException) {
            false
        }
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
        val list = ArrayList<String>()
        readableArray.toArrayList().forEachIndexed { index, element ->
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