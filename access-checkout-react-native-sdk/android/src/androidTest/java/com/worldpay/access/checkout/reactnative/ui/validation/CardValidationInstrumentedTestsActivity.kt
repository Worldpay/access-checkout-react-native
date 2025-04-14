package com.worldpay.access.checkout.reactnative.ui.validation

import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.ui.AbstractInstrumentedTestsActivity
import com.worldpay.access.checkout.reactnative.ui.react.FailureCallback
import com.worldpay.access.checkout.reactnative.ui.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.ui.utils.BridgeArguments
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.cvcId
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.expiryDateId
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.panId
import com.worldpay.access.checkout.reactnative.ui.utils.TestFixture
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