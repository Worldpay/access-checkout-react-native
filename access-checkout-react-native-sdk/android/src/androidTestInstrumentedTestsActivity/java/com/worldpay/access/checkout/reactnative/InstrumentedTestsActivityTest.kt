package com.worldpay.access.checkout.reactnative

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.worldpay.access.checkout.reactnative.MockServer.startWiremock
import com.worldpay.access.checkout.reactnative.MockServer.stopWiremock
import com.worldpay.access.checkout.reactnative.stubs.AccessServicesRootStub
import com.worldpay.access.checkout.reactnative.stubs.SessionsStub
import com.worldpay.access.checkout.reactnative.stubs.VerifiedTokensStub
import org.awaitility.Awaitility.await
import org.junit.After
import org.junit.Before
import org.junit.Test
import java.util.concurrent.TimeUnit


class InstrumentedTestsActivityTest {
    private val applicationContext: Context =
        InstrumentationRegistry.getInstrumentation().context.applicationContext

    @Before
    fun setup() {
        startWiremock(applicationContext, 8443)
    }

    @After
    fun tearDown() {
        stopWiremock()
    }

    @Test
    fun testShouldBeAbleToGenerateACardSession() {
        AccessServicesRootStub.stubRootSuccess()
        VerifiedTokensStub.stubRootSuccess()
        VerifiedTokensStub.stubSessionsSuccess("my-session")

        val scenario = ActivityScenario.launch(InstrumentedTestsActivity::class.java)

        await().atMost(5, TimeUnit.SECONDS).until {
            var session: String? = ""

            scenario.onActivity { activity ->
                session = activity.session
            }

            session == "my-session"
        }
    }

    @Test
    fun testShouldBeAbleToGenerateACardAndACvcSession() {
        AccessServicesRootStub.stubRootSuccess()
        VerifiedTokensStub.stubRootSuccess()
        VerifiedTokensStub.stubSessionsSuccess("my-session")
        SessionsStub.stubRootSuccess()
        SessionsStub.stubSessionsPaymentsCvcSuccess("my-other-session")

        val scenario = ActivityScenario.launch(InstrumentedTestsActivity::class.java)

        await().atMost(5, TimeUnit.SECONDS).until {
            var session: String? = ""

            scenario.onActivity { activity ->
                session = activity.session
            }

            session == "my-session"
        }
    }
}