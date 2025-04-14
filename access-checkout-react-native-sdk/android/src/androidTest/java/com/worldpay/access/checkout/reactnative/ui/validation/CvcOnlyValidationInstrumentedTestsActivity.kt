package com.worldpay.access.checkout.reactnative.ui.validation

import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.ui.AbstractInstrumentedTestsActivity
import com.worldpay.access.checkout.reactnative.ui.react.FailureCallback
import com.worldpay.access.checkout.reactnative.ui.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.ui.utils.BridgeArguments
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.baseUrl
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.cvcId
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