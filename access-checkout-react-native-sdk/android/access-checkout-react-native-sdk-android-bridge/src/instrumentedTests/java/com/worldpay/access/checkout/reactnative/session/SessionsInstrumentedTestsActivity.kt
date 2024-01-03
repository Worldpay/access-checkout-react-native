package com.worldpay.access.checkout.reactnative.session

import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.facebook.react.bridge.ReadableMap
import com.worldpay.access.checkout.reactnative.AbstractInstrumentedTestsActivity
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.react.FailureCallback
import com.worldpay.access.checkout.reactnative.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.utils.BridgeArguments
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.baseUrl
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.cvcId
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.expiryDateId
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.merchantId
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.panId
import com.worldpay.access.checkout.reactnative.utils.TestFixture
import kotlinx.coroutines.launch
import kotlin.coroutines.suspendCoroutine

class SessionsInstrumentedTestsActivity : AbstractInstrumentedTestsActivity() {
    var sessions: MutableMap<String, String> = HashMap()
    var exception: RuntimeException? = null

    override fun doOnCreate(module: AccessCheckoutReactNativeModule) {
        TestFixture.pan()?.let { setPan(it) }
        TestFixture.expiryDate()?.let { setExpiryDate(it) }
        TestFixture.cvc()?.let { setCvc(it) }

        launch {
            try {
                val bridgeArguments = BridgeArguments()
                    .baseUrl(baseUrl)
                    .merchantId(merchantId)
                    .panId(panId)
                    .expiryDateId(expiryDateId)
                    .cvcId(cvcId)
                    .sessionTypes(TestFixture.sessionsTypes())

                TestFixture.reactNativeSdkVersion()?.let {
                    bridgeArguments.reactNativeSdkVersion(it)
                }

                val result = generateSessions(module, bridgeArguments.toJavaOnlyMap())

                if (result.getString("card") != null) {
                    sessions["card"] = result.getString("card") as String
                }
                if (result.getString("cvc") != null) {
                    sessions["cvc"] = result.getString("cvc") as String
                }
            } catch (runtimeException: RuntimeException) {
                exception = runtimeException
            }

        }
    }

    private suspend fun generateSessions(
        module: AccessCheckoutReactNativeModule,
        arguments: JavaOnlyMap
    ): ReadableMap =
        suspendCoroutine { continuation ->
            val promise = PromiseImpl(
                SuccessCallback(continuation),
                FailureCallback(continuation)
            )

            module.generateSessions(arguments, promise)
        }
}
