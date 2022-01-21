package com.worldpay.access.checkout.reactnative.instrumentedTests.session

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.MockServer.startWiremock
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.MockServer.stopWiremock
import com.worldpay.access.checkout.reactnative.instrumentedTests.session.SessionsTestFixture.Companion.CARD
import com.worldpay.access.checkout.reactnative.instrumentedTests.session.SessionsTestFixture.Companion.CVC
import com.worldpay.access.checkout.reactnative.instrumentedTests.session.SessionsTestFixture.Companion.sessionsTextFixture
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.AccessServicesRootStub
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.SessionsStub
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.VerifiedTokensStub
import org.awaitility.Awaitility.await
import org.junit.After
import org.junit.Before
import org.junit.Test
import java.util.concurrent.TimeUnit.SECONDS


class SessionsInstrumentedTestsActivityTest {
    val TIMEOUT_IN_SECONDS = 5L

    private val applicationContext: Context =
        InstrumentationRegistry.getInstrumentation().context.applicationContext

    @Before
    fun setup() {
        startWiremock(applicationContext, 8443)

        AccessServicesRootStub.stubRootSuccess()
        VerifiedTokensStub.stubRootSuccess()
        SessionsStub.stubRootSuccess()
    }

    @After
    fun tearDown() {
        stopWiremock()
    }

    @Test
    fun testShouldBeAbleToGenerateACardSession() {
        VerifiedTokensStub.stubSessionsSuccess("my-session")
        sessionsTextFixture().pan("4444333322221111")
            .expiryDate("12/34")
            .cvc("123")
            .sessionsTypes(listOf(CARD))

        val scenario = ActivityScenario.launch(SessionsInstrumentedTestsActivity::class.java)

        val expectedSessions = mapOf("card" to "my-session")
        assertSessionsAre(scenario, expectedSessions)
    }

    @Test
    fun testShouldBeAbleToGenerateACardAndACvcSession() {
        VerifiedTokensStub.stubSessionsSuccess("my-session")
        SessionsStub.stubSessionsPaymentsCvcSuccess("my-other-session")

        sessionsTextFixture().pan("4444333322221111")
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

    private fun assertSessionsAre(
        scenario: ActivityScenario<SessionsInstrumentedTestsActivity>,
        expectedMap: Map<String, String>
    ) {
        await().atMost(TIMEOUT_IN_SECONDS, SECONDS).until {
            var sessions: Map<String, String> = HashMap()
            scenario.onActivity { activity ->
                sessions = activity.sessions
            }

            sessions == expectedMap
        }
    }
}