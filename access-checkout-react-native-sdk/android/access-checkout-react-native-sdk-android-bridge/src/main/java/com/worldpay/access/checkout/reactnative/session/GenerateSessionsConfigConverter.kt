package com.worldpay.access.checkout.reactnative.session

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.worldpay.access.checkout.client.session.model.SessionType
import com.worldpay.access.checkout.client.session.model.SessionType.CARD


class GenerateSessionsConfigConverter {

    fun fromReadableMap(map: ReadableMap): GenerateSessionsConfig {
        val baseUrl = extractString(fromMap = map, forKey = "baseUrl")
        val merchantId = extractString(fromMap = map, forKey = "merchantId")
        val panValue = extractString(fromMap = map, forKey = "panValue")
        val expiryDateValue = extractString(fromMap = map, forKey = "expiryDateValue")
        val cvcValue = extractString(fromMap = map, forKey = "cvcValue")
        val sessionTypes = map.getArray("sessionTypes")
        val reactNativeSdkVersion = extractString(fromMap = map, forKey = "reactNativeSdkVersion")

        validateNonEmptyString(baseUrl, "baseUrl")
        validateNonEmptyString(merchantId, "merchantId")
        validateNonEmptyString(reactNativeSdkVersion, "reactNativeSdkVersion")

        val sessionTypesList = toSessionTypesList(sessionTypes)

        if (sessionTypesList.contains(CARD)) {
            validateNonEmptyString(panValue, "panValue")
            validateNonEmptyString(expiryDateValue, "expiryDateValue")
            validateNonEmptyString(cvcValue, "cvcValue")

            return GenerateSessionsConfig(
                baseUrl = baseUrl!!,
                merchantId = merchantId!!,
                panValue = panValue!!,
                expiryDateValue = expiryDateValue!!,
                cvcValue = cvcValue!!,
                sessionTypes = sessionTypesList,
                reactNativeSdkVersion = reactNativeSdkVersion!!
            )
        } else {
            validateNonEmptyString(cvcValue, "cvcValue")

            return GenerateSessionsConfig(
                baseUrl = baseUrl!!,
                merchantId = merchantId!!,
                panValue = "",
                expiryDateValue = "",
                cvcValue = cvcValue!!,
                sessionTypes = sessionTypesList,
                reactNativeSdkVersion = reactNativeSdkVersion!!
            )
        }
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

    private fun validateNonEmptyString(property: String?, propertyKey: String) {
        if (property == null) {
            throw IllegalArgumentException("Expected $propertyKey to be provided but was not")
        } else if (property.isEmpty()) {
            throw IllegalArgumentException("Expected $propertyKey to be a non-empty String but was not")
        }
    }

    private fun extractString(fromMap: ReadableMap, forKey: String): String? {
        try {
            return fromMap.getString(forKey)
        } catch (e: ClassCastException) {
            throw IllegalArgumentException("Expected $forKey to be a String but was not")
        }
    }
}

