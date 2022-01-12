package com.worldpay.access.checkout.reactnative

import androidx.test.core.app.ActivityScenario
import com.github.tomakehurst.wiremock.junit.WireMockRule
import org.assertj.core.api.Assertions.assertThat
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

class InstrumentedTestsActivityTest {

//    @get:Rule
//    var mActivityTestRule: ActivityScenarioRule<InstrumentedTestsActivity> =
//        ActivityScenarioRule(InstrumentedTestsActivity::class.java)

    @get:Rule
    val wireMockRule = WireMockRule()

    @Test
    fun testShouldBeAbleToGenerateACardSession() {
        val stub = WiremockStub()
        stub.stubRootSuccess()
        stub.stubVerifiedTokensRootSuccess()
        stub.stubSessionsRootSuccess()
        stub.stubVerifiedTokensSessionsSuccess("my-session")

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