package com.worldpay.access.checkout.reactnative.session

import android.os.Bundle
import androidx.activity.ComponentActivity
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.facebook.react.bridge.ReadableMap
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.react.FailureCallback
import com.worldpay.access.checkout.reactnative.react.MockReactApplicationContext.Companion.mockReactApplicationContext
import com.worldpay.access.checkout.reactnative.react.SuccessCallback
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import kotlin.coroutines.suspendCoroutine

open class SessionsInstrumentedTestsActivity : ComponentActivity(), CoroutineScope by MainScope() {
    companion object {
        const val bridgeFieldBaseUrl = "baseUrl"
        const val bridgeFieldMerchantId = "merchantId"
        const val bridgeFieldPanId = "panValue"
        const val bridgeFieldExpiryDateId = "expiryDateValue"
        const val bridgeFieldCvcId = "cvcValue"
        const val bridgeFieldSessionTypes = "sessionTypes"
    }

    var sessions: MutableMap<String, String> = HashMap()
    var errorMessage: String = ""
    var exception: RuntimeException? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)

        val arguments = JavaOnlyMap()
        arguments.putString(bridgeFieldBaseUrl, SessionsTestFixture.baseUrl())
        arguments.putString(bridgeFieldMerchantId, SessionsTestFixture.merchantId())
        arguments.putString(bridgeFieldPanId, SessionsTestFixture.pan())
        arguments.putString(bridgeFieldExpiryDateId, SessionsTestFixture.expiryDate())
        arguments.putString(bridgeFieldCvcId, SessionsTestFixture.cvc())
        arguments.putArray(
                bridgeFieldSessionTypes,
                JavaOnlyArray.from(SessionsTestFixture.sessionsTypes())
        )

        val module = AccessCheckoutReactNativeModule(mockReactApplicationContext(this))

        launch {
            try {
                val result = generateSessions(module, arguments)

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
