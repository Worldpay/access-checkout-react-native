package com.worldpay.access.checkout.reactnative.session

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.worldpay.access.checkout.reactnative.services.AccessServicesRootStub
import com.worldpay.access.checkout.reactnative.services.MockServer
import com.worldpay.access.checkout.reactnative.services.MockServer.startStubServices
import com.worldpay.access.checkout.reactnative.services.MockServer.stopStubServices
import com.worldpay.access.checkout.reactnative.services.SessionsStub
import com.worldpay.access.checkout.reactnative.services.VerifiedTokensStub
import com.worldpay.access.checkout.reactnative.session.SessionsTestFixture.Companion.CARD
import com.worldpay.access.checkout.reactnative.session.SessionsTestFixture.Companion.CVC
import com.worldpay.access.checkout.reactnative.session.SessionsTestFixture.Companion.sessionsTextFixture
import org.awaitility.Awaitility.await
import org.junit.After
import org.junit.Before
import org.junit.Test
import java.util.concurrent.TimeUnit.MILLISECONDS


class SessionsInstrumentedTestsActivityTest {
    private val timeOutInMs = 5000L

    @Before
    fun setup() {
        val context: Context = InstrumentationRegistry.getInstrumentation().context
        startStubServices(context, MockServer.PORT)

        AccessServicesRootStub.stubRootSuccess()
        VerifiedTokensStub.stubRootSuccess()
        SessionsStub.stubRootSuccess()
    }

    @After
    fun tearDown() {
        stopStubServices()
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
        await().atMost(timeOutInMs, MILLISECONDS).until {
            var sessions: Map<String, String> = HashMap()
            scenario.onActivity { activity ->
                sessions = activity.sessions
            }

            sessions == expectedMap
        }
    }
}