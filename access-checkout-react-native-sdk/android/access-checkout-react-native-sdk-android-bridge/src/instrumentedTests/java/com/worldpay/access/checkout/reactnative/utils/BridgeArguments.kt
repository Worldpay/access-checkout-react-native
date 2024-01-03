package com.worldpay.access.checkout.reactnative.utils

import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap

class BridgeArguments {
    private companion object {
        const val bridgeFieldBaseUrl = "baseUrl"
        const val bridgeFieldMerchantId = "merchantId"
        const val bridgeFieldPanId = "panId"
        const val bridgeFieldExpiryDateId = "expiryDateId"
        const val bridgeFieldCvcId = "cvcId"
        const val bridgeFieldEnablePanFormatting = "enablePanFormatting"
        const val bridgeFieldAcceptedCardBrands = "acceptedCardBrands"
        const val bridgeFieldSessionTypes = "sessionTypes"
        const val bridgeFieldReactNativeSdkVersion = "reactNativeSdkVersion"

        const val defaultReactNativeSdkVersion = "1.0.0"
    }

    private val map = JavaOnlyMap()

    init {
        map.putString(bridgeFieldReactNativeSdkVersion, defaultReactNativeSdkVersion)
    }

    fun baseUrl(baseUrl: String): BridgeArguments {
        map.putString(bridgeFieldBaseUrl, baseUrl)
        return this
    }

    fun merchantId(merchantId: String): BridgeArguments {
        map.putString(bridgeFieldMerchantId, merchantId)
        return this
    }

    fun panId(panId: String): BridgeArguments {
        map.putString(bridgeFieldPanId, panId)
        return this
    }

    fun expiryDateId(expiryDateId: String): BridgeArguments {
        map.putString(bridgeFieldExpiryDateId, expiryDateId)
        return this
    }

    fun cvcId(cvcId: String): BridgeArguments {
        map.putString(bridgeFieldCvcId, cvcId)
        return this
    }

    fun enablePanFormatting(enablePanFormatting: Boolean): BridgeArguments {
        map.putBoolean(bridgeFieldEnablePanFormatting, enablePanFormatting)
        return this
    }

    fun acceptedCardBrands(acceptedCardBrands: List<String>): BridgeArguments {
        map.putArray(bridgeFieldAcceptedCardBrands, JavaOnlyArray.from(acceptedCardBrands))
        return this
    }

    fun sessionTypes(sessionTypes: List<String>): BridgeArguments {
        map.putArray(bridgeFieldSessionTypes, JavaOnlyArray.from(sessionTypes))
        return this
    }

    fun reactNativeSdkVersion(reactNativeSdkVersion: String): BridgeArguments {
        map.putString(bridgeFieldReactNativeSdkVersion, reactNativeSdkVersion)
        return this
    }

    fun toJavaOnlyMap(): JavaOnlyMap {
        return map
    }
}