package com.worldpay.access.checkout.reactnative.config

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.worldpay.access.checkout.client.session.model.SessionType

class GenerateSessionConfigConverter {

    fun fromReadableMap(readableMap: ReadableMap): GenerateSessionsConfig {
        val baseUrl = readableMap.getString("baseUrl")
        val merchantId = readableMap.getString("merchantId")
        val panValue = readableMap.getString("panValue")
        val expiryValue = readableMap.getString("expiryValue")
        val cvcValue = readableMap.getString("cvcValue")
        val sessionTypes = readableMap.getArray("sessionTypes")

        validateNotNull(baseUrl, "base url")
        validateNotNull(merchantId, "merchant id")
        validateNotNull(panValue, "pan value")
        validateNotNull(expiryValue, "expiry value")
        validateNotNull(cvcValue, "cvc value")

        return GenerateSessionsConfig(
            baseUrl = baseUrl as String,
            merchantId = merchantId as String,
            panValue = panValue as String,
            expiryValue = expiryValue as String,
            cvcValue = cvcValue as String,
            sessionTypes = toSessionTypesList(sessionTypes)
        )
    }

    private fun toSessionTypesList(sessionTypes: ReadableArray?): List<SessionType> {
        if (sessionTypes == null || sessionTypes.size() == 0) {
            throw IllegalArgumentException("Expected session types to be provided but was not")
        }

        if (sessionTypes.size() > 2) {
            throw IllegalArgumentException("Expected maximum of 2 session types to be provided but found ${sessionTypes.size()}")
        }

        val sessionTypeList = mutableListOf<SessionType>()
        sessionTypes.toArrayList().forEach { element ->
            if (element !is String) {
                throw IllegalArgumentException("Expected session type value to be a string but was not")
            }

            when {
                element.toString().lowercase() == "card" -> {
                    sessionTypeList.add(SessionType.CARD)
                }
                element.toString().lowercase() == "cvc" -> {
                    sessionTypeList.add(SessionType.CVC)
                }
                else -> {
                    throw IllegalArgumentException("Unrecognised session type found $element, only CARD or CVC is accepted")
                }
            }
        }

        return sessionTypeList
    }

    private fun validateNotNull(property: Any?, propertyKey: String) {
        if (property == null) {
            throw IllegalArgumentException("Expected $propertyKey to be provided but was not")
        }
    }
}