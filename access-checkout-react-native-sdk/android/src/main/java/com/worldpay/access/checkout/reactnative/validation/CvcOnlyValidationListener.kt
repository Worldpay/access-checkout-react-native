package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.worldpay.access.checkout.client.validation.listener.AccessCheckoutCvcValidationListener

/**
 * Internal implementation of the [AccessCheckoutCvcValidationListener] that uses the reactContext
 * to emit events to JS with the validation result information that is given by the Access Checkout SDK.
 *
 * Each event will contain an object that JS can then use to extract information
 */

class CvcOnlyValidationListener(private val reactContext: ReactApplicationContext): AccessCheckoutCvcValidationListener {

    private val eventName = "AccessCheckoutCvcOnlyValidationEvent"

    /**
     * Handles the cvc validated event given by ACO SDK.
     *
     * This method will eventually emit an event with the following object:
     *
     * { type: 'cvc', isValid: true/false }
     *
     * @param isValid [Boolean] represents whether the cvc is valid or not
     */

    override fun onCvcValidated(isValid: Boolean) {
        val resultData = WritableNativeMap()
        resultData.putString("type", "cvc")
        resultData.putBoolean("isValid", isValid)

        sendEvent(reactContext, resultData)
    }

    /**
     * Handles the validation success event (called when all fields are valid)
     *
     * This method will eventually emit an event with the following object:
     *
     * { type: 'all', isValid: true/false }
     */

    override fun onValidationSuccess() {
        val resultData = WritableNativeMap()
        resultData.putString("type", "all")
        resultData.putBoolean("isValid", true)

        sendEvent(reactContext, resultData)
    }

    /**
     * Sends the given [params] event using the react context and the eventName
     */
    private fun sendEvent(reactContext: ReactContext, params: WritableMap) {
        reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}