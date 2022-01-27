package com.worldpay.access.checkout.reactnative

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableNativeMap
import com.worldpay.access.checkout.client.api.exception.AccessCheckoutException
import com.worldpay.access.checkout.client.session.listener.SessionResponseListener
import com.worldpay.access.checkout.client.session.model.SessionType

/**
 * Internal implementation of the [SessionResponseListener] that uses the promises to resolve/reject
 * depending on which method is called by the Access Checkout SDK
 */
class SessionResponseListenerImpl : SessionResponseListener {

    lateinit var promise: Promise

    /**
     * Called when a session is successfully retrieved by the Access Checkout SDK
     *
     * The response will be resolved in the promise so that the JS can then use it in the .then()
     *
     * @param[sessionResponseMap] A [Map] of [SessionType] requested with associated [String] response
     */
    override fun onSuccess(sessionResponseMap: Map<SessionType, String>) {
        Log.d(javaClass.simpleName, "Received session reference map: $sessionResponseMap")
        val resultingMap = WritableNativeMap()

        if (sessionResponseMap[SessionType.CARD] != null) {
            resultingMap.putString("card", sessionResponseMap[SessionType.CARD])
        }
        if (sessionResponseMap[SessionType.CVC] != null) {
            resultingMap.putString("cvc", sessionResponseMap[SessionType.CVC])
        }
        promise.resolve(resultingMap)
    }

    /**
     * Called when a session is unsuccessfully retrieved by the Access Checkout SDK (i.e. throws an error)
     *
     * The response will be rejected in the promise so that the JS can then use it in the .catch()
     *
     * @param[error] The [AccessCheckoutException] that was raised
     */
    override fun onError(error: AccessCheckoutException) {
        Log.d(javaClass.simpleName, "Received error: ${error.message}")
        promise.reject("CODE", error.message)
    }
}
