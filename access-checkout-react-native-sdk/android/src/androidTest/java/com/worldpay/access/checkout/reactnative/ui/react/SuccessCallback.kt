package com.worldpay.access.checkout.reactnative.ui.react

import com.facebook.react.bridge.Callback
import kotlin.Result.Companion.success
import kotlin.coroutines.Continuation

class SuccessCallback<T>(
    private val continuation: Continuation<T>
) : Callback {

    override fun invoke(vararg args: Any?) {
        @Suppress("UNCHECKED_CAST")
        val valueToReturn: T = args[0] as T

        continuation.resumeWith(success(valueToReturn))
    }
}
