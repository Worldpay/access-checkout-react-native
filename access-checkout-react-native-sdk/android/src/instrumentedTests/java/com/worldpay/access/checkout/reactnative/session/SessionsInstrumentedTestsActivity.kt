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
import com.worldpay.access.checkout.reactnative.session.SessionsInstrumentedTestsActivity.BridgeSessionFieldNames.Companion.BASE_URL_FIELD
import com.worldpay.access.checkout.reactnative.session.SessionsInstrumentedTestsActivity.BridgeSessionFieldNames.Companion.CVC_ID_FIELD
import com.worldpay.access.checkout.reactnative.session.SessionsInstrumentedTestsActivity.BridgeSessionFieldNames.Companion.EXPIRY_DATE_ID_FIELD
import com.worldpay.access.checkout.reactnative.session.SessionsInstrumentedTestsActivity.BridgeSessionFieldNames.Companion.MERCHANT_ID_FIELD
import com.worldpay.access.checkout.reactnative.session.SessionsInstrumentedTestsActivity.BridgeSessionFieldNames.Companion.PAN_ID_FIELD
import com.worldpay.access.checkout.reactnative.session.SessionsInstrumentedTestsActivity.BridgeSessionFieldNames.Companion.SESSION_TYPES_FIELD
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import kotlin.coroutines.suspendCoroutine

open class SessionsInstrumentedTestsActivity : ComponentActivity(), CoroutineScope by MainScope() {
    var sessions: MutableMap<String, String> = HashMap()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)

        val arguments = JavaOnlyMap()
        arguments.putString(BASE_URL_FIELD, SessionsTestFixture.baseUrl())
        arguments.putString(MERCHANT_ID_FIELD, SessionsTestFixture.merchantId())
        arguments.putString(PAN_ID_FIELD, SessionsTestFixture.pan())
        arguments.putString(EXPIRY_DATE_ID_FIELD, SessionsTestFixture.expiryDate())
        arguments.putString(CVC_ID_FIELD, SessionsTestFixture.cvc())
        arguments.putArray(
            SESSION_TYPES_FIELD,
            JavaOnlyArray.from(SessionsTestFixture.sessionsTypes())
        )

        val module = AccessCheckoutReactNativeModule(mockReactApplicationContext(this))

        launch {
            val result = generateSessions(module, arguments)

            if (result.getString("card") != null) {
                sessions["card"] = result.getString("card") as String
            }
            if (result.getString("cvc") != null) {
                sessions["cvc"] = result.getString("cvc") as String
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

    class BridgeSessionFieldNames {
        companion object {
            const val BASE_URL_FIELD = "baseUrl"
            const val MERCHANT_ID_FIELD = "merchantId"
            const val PAN_ID_FIELD = "panValue"
            const val EXPIRY_DATE_ID_FIELD = "expiryValue"
            const val CVC_ID_FIELD = "cvcValue"
            const val SESSION_TYPES_FIELD = "sessionTypes"
        }
    }
}