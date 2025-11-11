package com.worldpay.access.checkout.reactnative.ui.session

import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.facebook.react.bridge.ReadableMap
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.ui.AbstractInstrumentedTestsActivity
import com.worldpay.access.checkout.reactnative.ui.react.FailureCallback
import com.worldpay.access.checkout.reactnative.ui.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.ui.utils.BridgeArguments
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.baseUrl
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.cvcId
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.expiryDateId
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.merchantId
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.panId
import com.worldpay.access.checkout.reactnative.ui.utils.TestFixture
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
                    .apply {
                        TestFixture.reactNativeSdkVersion()?.let { reactNativeSdkVersion(it) }
                    }

                val result = generateSessions(module, bridgeArguments.toJavaOnlyMap())

                // Generic extraction to avoid missing unexpected key names
                result.keySetIterator().let { iterator ->
                    while (iterator.hasNextKey()) {
                        val key = iterator.nextKey()
                        val value = result.getString(key)
                        if (value != null) {
                            sessions[key] = value
                        }
                    }
                }

                if (sessions.isEmpty()) {
                    exception = RuntimeException("No sessions returned. Requested types: ${TestFixture.sessionsTypes()}")
                }
            } catch (e: RuntimeException) {
                exception = e
            }
        }
    }

    private suspend fun generateSessions(
        module: AccessCheckoutReactNativeModule,
        arguments: JavaOnlyMap
    ): ReadableMap = suspendCoroutine { continuation ->
        val promise = PromiseImpl(
            SuccessCallback(continuation),
            FailureCallback(continuation)
        )
        module.generateSessions(arguments, promise)
    }
}