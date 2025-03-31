package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.worldpay.access.checkout.reactnative.AbstractInstrumentedTestsActivity
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.react.FailureCallback
import com.worldpay.access.checkout.reactnative.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.utils.BridgeArguments
import com.worldpay.access.checkout.reactnative.utils.TestConstants
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.cvcId
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.expiryDateId
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.panId
import com.worldpay.access.checkout.reactnative.utils.TestFixture
import kotlinx.coroutines.launch
import kotlin.coroutines.suspendCoroutine


class CardValidationInstrumentedTestsActivity : AbstractInstrumentedTestsActivity() {

    override fun doOnCreate(module: AccessCheckoutReactNativeModule) {
        launch {
            val bridgeArguments = BridgeArguments()
                .baseUrl(TestConstants.baseUrl)
                .panId(panId)
                .expiryDateId(expiryDateId)
                .cvcId(cvcId)
                .enablePanFormatting(TestFixture.enablePanFormatting())
                .acceptedCardBrands(TestFixture.acceptedCardBrands())

            initialiseCardValidation(module, bridgeArguments.toJavaOnlyMap())
        }
    }

    private suspend fun initialiseCardValidation(
        module: AccessCheckoutReactNativeModule,
        arguments: JavaOnlyMap
    ): Boolean = suspendCoroutine { continuation ->
        val promise = PromiseImpl(
            SuccessCallback(continuation),
            FailureCallback(continuation)
        )

        module.initialiseCardValidation(arguments, promise)
    }
}