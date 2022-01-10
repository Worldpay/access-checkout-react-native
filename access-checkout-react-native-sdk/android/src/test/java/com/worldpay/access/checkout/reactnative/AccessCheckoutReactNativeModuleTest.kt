package com.worldpay.access.checkout.reactnative

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.*
import com.github.tomakehurst.wiremock.junit.WireMockRule
import com.worldpay.access.checkout.client.session.model.SessionType
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import kotlin.coroutines.Continuation
import kotlin.coroutines.suspendCoroutine

@ExperimentalCoroutinesApi
@RunWith(RobolectricTestRunner::class)
internal class AccessCheckoutReactNativeModuleTest {

    @get:Rule
    val wireMockRule = WireMockRule()

    private val module = AccessCheckoutReactNativeModule(reactApplicationContext())

    @Test
    fun shouldBeAbleToGenerateACardSession() {
        val stub = WiremockStub()
        stub.stubRootSuccess()
        stub.stubVerifiedTokensRootSuccess()
        stub.stubSessionsRootSuccess()
        stub.stubVerifiedTokensSessionsSuccess("my-session")


        val sessions: Map<SessionType, String>

        runBlocking {
            sessions = generateSessions()
        }
        Assertions.assertThat(sessions[SessionType.CARD]).isEqualTo("my-session")
    }

    suspend fun generateSessions(): Map<SessionType, String> = suspendCoroutine { continuation ->
        val map = JavaOnlyMap()
        map.putString("baseUrl", "http://localhost:8080/")
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
            continuation.resumeWith(Result.failure(RuntimeException("Failed somehow")))
        }

    }

    private fun reactApplicationContext(): ReactApplicationContext {
        val applicationContext: Context = ApplicationProvider.getApplicationContext()
        return ReactApplicationContext(applicationContext)
    }
}