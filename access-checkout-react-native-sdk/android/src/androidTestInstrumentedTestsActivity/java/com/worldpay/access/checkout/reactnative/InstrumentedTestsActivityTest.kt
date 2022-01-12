package com.worldpay.access.checkout.reactnative

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.worldpay.access.checkout.reactnative.MockServer.startWiremock
import com.worldpay.access.checkout.reactnative.MockServer.stopWiremock
import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test


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
        val stub = WiremockStub()
        stub.stubRootSuccess()
        stub.stubVerifiedTokensRootSuccess()
        stub.stubSessionsRootSuccess()
        stub.stubVerifiedTokensSessionsSuccess("my-session")

        // wireMockServer!!.start()

        val scenario = ActivityScenario.launch(InstrumentedTestsActivity::class.java)


//        val sessions: MutableMap<SessionType, String> = LinkedHashMap()
//        sessions[SessionType.CARD] = ""

        // You can inspect internal state of your activity by
        scenario.onActivity { activity ->
            assertThat(activity.session).isEqualTo("test")
        }

        // assertThat(sessions[SessionType.CARD]).isEqualTo("my-session")
    }
}