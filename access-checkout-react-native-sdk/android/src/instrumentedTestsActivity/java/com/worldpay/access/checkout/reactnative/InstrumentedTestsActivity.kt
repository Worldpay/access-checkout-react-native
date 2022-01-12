package com.worldpay.access.checkout.reactnative

import android.app.Activity
import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.*
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.client.session.model.SessionType
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import kotlin.coroutines.Continuation
import kotlin.coroutines.suspendCoroutine

class InstrumentedTestsActivity : ComponentActivity(), CoroutineScope by MainScope() {
    var session: String? = "test"

    private var module: AccessCheckoutReactNativeModule? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)

        module = AccessCheckoutReactNativeModule(reactApplicationContext())

        launch {
            val result = generateSessions(module!!)
            session = result[SessionType.CARD]
        }
    }

    suspend fun generateSessions(module: AccessCheckoutReactNativeModule): Map<SessionType, String> =
        suspendCoroutine { continuation ->
            val map = JavaOnlyMap()
            map.putString("baseUrl", "https://localhost:8443/")
            map.putString("merchantId", "some-id")
            map.putString("panValue", "4444333322221111")
            map.putString("expiryValue", "12/34")
            map.putString("cvcValue", "123")
            map.putArray("sessionTypes", JavaOnlyArray.from(listOf("card", "cvc")))

            val promise = PromiseImpl(
                SuccessCallback(continuation),
                FailureCallback(continuation)
            )

            module.generateSessions(map, promise)
        }

    private fun reactApplicationContext(): ReactApplicationContext {
        val applicationContext: Context = ApplicationProvider.getApplicationContext()
        // return ReactApplicationContext(applicationContext)
        return MockReactApplicationContext(applicationContext, this)
    }

    class MockReactApplicationContext(context: Context, activity: Activity) :
        ReactApplicationContext(context) {
        var activity: Activity? = activity

        override fun getCurrentActivity(): Activity? {
            return if (activity == null) {
                null
            } else activity
        }

    }

    class SuccessCallback<T> constructor(
        private val continuation: Continuation<T>
    ) : Callback {

        override fun invoke(vararg args: Any?) {
            continuation.resumeWith(Result.success(args as T))
        }

    }

    class FailureCallback<T> constructor(
        private val continuation: Continuation<T>
    ) : Callback {

        override fun invoke(vararg args: Any?) {
            val map = args[0] as ReadableNativeMap
            val message = map.getString("message")
            continuation.resumeWith(Result.failure(RuntimeException(message)))
        }

    }

}