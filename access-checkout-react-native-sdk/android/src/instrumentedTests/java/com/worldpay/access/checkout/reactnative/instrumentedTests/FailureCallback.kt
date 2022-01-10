package com.worldpay.access.checkout.reactnative.instrumentedTests

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReadableNativeMap
import kotlin.Result.Companion.failure
import kotlin.coroutines.Continuation

class FailureCallback<T> constructor(
    private val continuation: Continuation<T>
) : Callback {

    override fun invoke(vararg args: Any?) {
        val map = args[0] as ReadableNativeMap
        val message = map.getString("message")

        continuation.resumeWith(failure(RuntimeException(message)))
    }

}