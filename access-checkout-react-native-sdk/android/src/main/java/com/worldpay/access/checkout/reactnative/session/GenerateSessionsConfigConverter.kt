package com.worldpay.access.checkout.reactnative.session

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.worldpay.access.checkout.client.session.model.SessionType

class GenerateSessionsConfigConverter {

    fun fromReadableMap(readableMap: ReadableMap): GenerateSessionsConfig {
        val baseUrl = readableMap.getString("baseUrl")
        val merchantId = readableMap.getString("merchantId")
        val panValue = readableMap.getString("panValue")
        val expiryDateValue = readableMap.getString("expiryDateValue")
        val cvcValue = readableMap.getString("cvcValue")
        val sessionTypes = readableMap.getArray("sessionTypes")

        validateNotNull(baseUrl, "baseUrl")
        validateNotNull(merchantId, "merchantId")

        if (sessionTypes != null && sessionTypes.toArrayList().contains("card"))
        {
            validateNotNull(panValue, "panValue")
            validateNotNull(expiryDateValue, "expiryDateValue")
            validateNotNull(cvcValue, "cvcValue")
        }

        if (sessionTypes != null && sessionTypes.toArrayList().contains("cvc"))
        {
            validateNotNull(cvcValue, "cvcValue")
        }

        return GenerateSessionsConfig(
            baseUrl = baseUrl as String,
            merchantId = merchantId as String,
            panValue = panValue,
            expiryDateValue = expiryDateValue,
            cvcValue = cvcValue,
            sessionTypes = toSessionTypesList(sessionTypes)
        )
    }

    private fun toSessionTypesList(sessionTypes: ReadableArray?): List<SessionType> {
        if (sessionTypes == null || sessionTypes.size() == 0) {
            throw IllegalArgumentException("Expected sessionTypes to be provided but was not")
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

