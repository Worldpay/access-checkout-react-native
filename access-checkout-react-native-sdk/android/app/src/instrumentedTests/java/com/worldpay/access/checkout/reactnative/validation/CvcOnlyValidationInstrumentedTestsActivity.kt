package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.worldpay.access.checkout.reactnative.AbstractInstrumentedTestsActivity
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.react.FailureCallback
import com.worldpay.access.checkout.reactnative.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.utils.BridgeArguments
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.baseUrl
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.cvcId
import kotlinx.coroutines.launch
import kotlin.coroutines.suspendCoroutine

class CvcOnlyValidationInstrumentedTestsActivity : AbstractInstrumentedTestsActivity() {

    override fun doOnCreate(module: AccessCheckoutReactNativeModule) {
        launch {
            val bridgeArguments = BridgeArguments()
                .baseUrl(baseUrl)
                .cvcId(cvcId)

            initialiseCvcOnlyValidation(module, bridgeArguments.toJavaOnlyMap())
        }
    }

    private suspend fun initialiseCvcOnlyValidation(
        module: AccessCheckoutReactNativeModule,
        arguments: JavaOnlyMap
    ): Boolean = suspendCoroutine { continuation ->
        val promise = PromiseImpl(
            SuccessCallback(continuation),
            FailureCallback(continuation)
        )

        module.initialiseCvcOnlyValidation(arguments, promise)
    }
}