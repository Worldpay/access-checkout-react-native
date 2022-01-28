package com.worldpay.access.checkout.reactnative.react

import com.facebook.react.bridge.Callback
import kotlin.Result.Companion.success
import kotlin.coroutines.Continuation

class SuccessCallback<T> constructor(
    private val continuation: Continuation<T>
) : Callback {

    override fun invoke(vararg args: Any?) {
        val valueToReturn: T = args[0] as T

        continuation.resumeWith(success(valueToReturn))
    }
}