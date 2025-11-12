package com.worldpay.access.checkout.reactnative.session

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.worldpay.access.checkout.client.session.model.SessionType


class GenerateSessionsConfigConverter {

    fun fromReadableMap(map: ReadableMap): GenerateSessionsConfig {
        val baseUrl = extractString(map, "baseUrl")
        val merchantId = extractString(map, "merchantId")
        val panId = extractString(map, "panId")
        val expiryDateId = extractString(map, "expiryDateId")
        val cvcId = extractString(map, "cvcId")
        val sessionTypesArray = map.getArray("sessionTypes")
        val reactNativeSdkVersion = extractString(map, "reactNativeSdkVersion")

        validateNonEmptyString(baseUrl, "baseUrl")
        validateNonEmptyString(merchantId, "merchantId")
        validateNonEmptyString(reactNativeSdkVersion, "reactNativeSdkVersion")

        val sessionTypes = toSessionTypesList(sessionTypesArray)

        val requiresCard = sessionTypes.contains(SessionType.CARD)
        if (requiresCard) {
            validateNonEmptyString(panId, "panId")
            validateNonEmptyString(expiryDateId, "expiryDateId")
        }
        validateNonEmptyString(cvcId, "cvcId") // always required because CVC can be standalone or part of CARD set

        return GenerateSessionsConfig(
            baseUrl = baseUrl!!,
            merchantId = merchantId!!,
            panId = if (requiresCard) panId else null,
            expiryDateId = if (requiresCard) expiryDateId else null,
            cvcId = cvcId!!,
            sessionTypes = sessionTypes,
            reactNativeSdkVersion = reactNativeSdkVersion!!
        )
    }

    private fun toSessionTypesList(sessionTypes: ReadableArray?): List<SessionType> {
        if (sessionTypes == null || sessionTypes.size() == 0) {
            throw IllegalArgumentException("Expected sessionTypes to be provided but was not")
        }
        if (sessionTypes.size() > 2) {
            throw IllegalArgumentException("Expected maximum of 2 session types but found ${sessionTypes.size()}")
        }

        return sessionTypes.toArrayList().map { element ->
            if (element !is String) {
                throw IllegalArgumentException("Expected session type value to be a String but was not")
            }
            when (element.lowercase()) {
                "card" -> SessionType.CARD
                "cvc" -> SessionType.CVC
                else -> throw IllegalArgumentException("Unrecognised session type $element, only CARD or CVC accepted")
            }
        }
    }

    private fun validateNonEmptyString(value: String?, key: String) {
        if (value == null) throw IllegalArgumentException("Expected $key to be provided but was not")
        if (value.isEmpty()) throw IllegalArgumentException("Expected $key to be a non-empty String but was empty")
    }

    private fun extractString(map: ReadableMap, key: String): String? =
        try { map.getString(key) } catch (e: ClassCastException) {
            throw IllegalArgumentException("Expected $key to be a String but was not")
        }
}