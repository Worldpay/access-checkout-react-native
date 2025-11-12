package com.worldpay.access.checkout.reactnative.instrumentation.session

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.github.tomakehurst.wiremock.client.WireMock.equalTo
import com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor
import com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo
import com.github.tomakehurst.wiremock.client.WireMock.verify
import com.worldpay.access.checkout.reactnative.instrumentation.services.AccessServicesRootStub
import com.worldpay.access.checkout.reactnative.instrumentation.services.MockServer
import com.worldpay.access.checkout.reactnative.instrumentation.services.MockServer.startStubServices
import com.worldpay.access.checkout.reactnative.instrumentation.services.MockServer.stopStubServices
import com.worldpay.access.checkout.reactnative.instrumentation.services.SessionsStub
import com.worldpay.access.checkout.reactnative.ui.session.SessionsInstrumentedTestsActivity
import com.worldpay.access.checkout.reactnative.ui.utils.TestFixture.Companion.CARD
import com.worldpay.access.checkout.reactnative.ui.utils.TestFixture.Companion.CVC
import com.worldpay.access.checkout.reactnative.ui.utils.TestFixture.Companion.testFixture
import org.awaitility.Awaitility.await
import org.junit.After
import org.junit.Before
import org.junit.Test
import java.util.concurrent.TimeUnit.MILLISECONDS


class SessionsInstrumentedTests {
    private val timeOutInMs = 10000L

    @Before
    fun setup() {
        testFixture().clear()

        val context: Context = InstrumentationRegistry.getInstrumentation().context
        startStubServices(context, MockServer.PORT)

        AccessServicesRootStub.stubRootSuccess()
        SessionsStub.stubRootSuccess()
    }

    @After
    fun tearDown() {
        stopStubServices()
    }

    @Test
    fun testShouldBeAbleToGenerateACardSession() {
        SessionsStub.stubSessionsCardSuccess("my-session")
        testFixture().pan("4444333322221111")
            .expiryDate("12/34")
            .cvc("123")
            .sessionsTypes(listOf(CARD))

        val scenario = ActivityScenario.launch(SessionsInstrumentedTestsActivity::class.java)

        val expectedSessions = mapOf("card" to "my-session")
        assertSessionsAre(scenario, expectedSessions)
    }

    @Test
    fun testShouldBeAbleToGenerateACardAndACvcSession() {
        SessionsStub.stubSessionsCardSuccess("my-session")
        SessionsStub.stubSessionsPaymentsCvcSuccess("my-other-session")

        testFixture().pan("4444333322221111")
            .expiryDate("12/34")
            .cvc("123")
            .sessionsTypes(listOf(CARD, CVC))

        val scenario = ActivityScenario.launch(SessionsInstrumentedTestsActivity::class.java)

        val expectedSessions = mapOf(
            "card" to "my-session",
            "cvc" to "my-other-session"
        )
        assertSessionsAre(scenario, expectedSessions)
    }

    @Test
    fun testShouldBeAbleToGenerateACvcOnlySession() {
        SessionsStub.stubSessionsPaymentsCvcSuccess("my-other-session")

        testFixture()
            .cvc("123")
            .sessionsTypes(listOf(CVC))

        val scenario = ActivityScenario.launch(SessionsInstrumentedTestsActivity::class.java)

        val expectedSessions = mapOf(
            "cvc" to "my-other-session"
        )
        assertSessionsAre(scenario, expectedSessions)
    }

    @Test
    fun testShouldThrowExceptionWhenFailingGenerateSession() {
        val message = "Unable to generate session"
        val errorName = "Invalid Request"
        val expectedException = RuntimeException("$errorName : $message")

        SessionsStub.stubSessionsCardSuccess("my-session")
        SessionsStub.stubSessionsPaymentsCvcFailure(errorName, message)

        testFixture().pan("4444333322221111")
            .expiryDate("12/34")
            .cvc("123")
            .sessionsTypes(listOf(CARD, CVC))

        val scenario = ActivityScenario.launch(SessionsInstrumentedTestsActivity::class.java)

        assertExceptionIs(scenario, expectedException)
    }

    @Test
    fun testShouldSetNativeSdkWpSdkHeaderWithAccessCheckoutReactNativeVersion() {
        SessionsStub.stubSessionsCardSuccess("my-session")
        SessionsStub.stubSessionsPaymentsCvcSuccess("my-other-session")

        testFixture().pan("4444333322221111")
            .expiryDate("12/34")
            .cvc("123")
            .sessionsTypes(listOf(CARD, CVC))
            .reactNativeSdkVersion("1.2.3")

        val scenario = ActivityScenario.launch(SessionsInstrumentedTestsActivity::class.java)

        val expectedSessions = mapOf(
            "card" to "my-session",
            "cvc" to "my-other-session"
        )
        assertSessionsAre(scenario, expectedSessions)

        verify(
            postRequestedFor(urlEqualTo("/sessions/payments/cvc"))
                .withHeader("X-WP-SDK", equalTo("access-checkout-react-native/1.2.3"))
        )
    }

    private fun assertSessionsAre(
        scenario: ActivityScenario<SessionsInstrumentedTestsActivity>,
        expectedMap: Map<String, String>
    ) {
        await().atMost(timeOutInMs, MILLISECONDS).until {
            var sessions: Map<String, String> = HashMap()
            scenario.onActivity { activity ->
                sessions = activity.sessions

            }
            if (sessions != expectedMap) {
                throw AssertionError("Expected sessions: $expectedMap but was: $sessions")
            }
            true
        }
    }

    private fun assertExceptionIs(
        scenario: ActivityScenario<SessionsInstrumentedTestsActivity>,
        expectedException: RuntimeException
    ) {
        await().atMost(timeOutInMs, MILLISECONDS).until {
            var exception: RuntimeException? = null
            scenario.onActivity { activity ->
                if (activity.exception != null) {
                    exception = activity.exception
                }
            }

            if (exception == null) {
                false
            } else {
                when {
                    exception!!::class.java != expectedException::class.java -> {
                        throw AssertionError("Expected exception class to be '${expectedException::class.java.simpleName}' but was '${exception!!::class.java.simpleName}'")
                    }

                    exception!!.message != expectedException.message -> {
                        throw AssertionError("Expected exception message to be '${expectedException.message}' but was '${exception!!.message}'")
                    }

                    else -> {
                        true
                    }
                }
            }
        }
    }
}
