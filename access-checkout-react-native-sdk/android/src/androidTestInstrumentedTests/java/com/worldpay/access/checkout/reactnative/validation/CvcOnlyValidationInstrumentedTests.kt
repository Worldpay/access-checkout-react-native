package com.worldpay.access.checkout.reactnative.validation

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.github.tomakehurst.wiremock.client.WireMock
import com.worldpay.access.checkout.reactnative.react.EventMock
import com.worldpay.access.checkout.reactnative.services.MockServer
import com.worldpay.access.checkout.reactnative.services.MockServer.startStubServices
import com.worldpay.access.checkout.reactnative.services.MockServer.stopStubServices
import com.worldpay.access.checkout.reactnative.validation.CvcOnlyValidationTestFixture.Companion.cvcOnlyValidationTestFixture
import org.awaitility.Awaitility.await
import org.junit.*
import java.util.concurrent.CopyOnWriteArrayList
import java.util.concurrent.TimeUnit.MILLISECONDS

class CvcOnlyValidationInstrumentedTests {
    private val timeOutInMs = 5000L

    companion object {
        @BeforeClass
        @JvmStatic
        fun setUpOnce() {
            val applicationContext: Context = InstrumentationRegistry.getInstrumentation()
                .context.applicationContext
            startStubServices(applicationContext, MockServer.PORT)
        }

        @AfterClass
        @JvmStatic
        fun tearDownOnce() {
            stopStubServices()
        }
    }


    @Before
    fun setUp() {
        cvcOnlyValidationTestFixture()
            .clear()
            .cvcId(CvcOnlyValidationInstrumentedTestsActivity.cvcId)

        CvcOnlyValidationInstrumentedTestsActivity.clearActions()
    }

    @After
    fun tearDown() {
        WireMock.reset()
    }

    @Test
    fun shouldRaiseEventWhenCvcBecomesValid() {
        startActivity().use { scenario ->
            CvcOnlyValidationInstrumentedTestsActivity.run { activity ->
                activity.setCvc("123")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 2
                        && events.first().name == "AccessCheckoutCvcOnlyValidationEvent"
                        && events.first().stringOf("type") == "cvc"
                        && events.first().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenCvcBecomesInvalid() {
        startActivity().use { scenario ->
            CvcOnlyValidationInstrumentedTestsActivity.run { activity ->
                activity.setCvc("123")
                activity.setCvc("12")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 3
                        && events.first().name == "AccessCheckoutCvcOnlyValidationEvent"
                        && events.first().stringOf("type") == "cvc"
                        && events.first().booleanOf("isValid")

                        && events.last().name == "AccessCheckoutCvcOnlyValidationEvent"
                        && events.last().stringOf("type") == "cvc"
                        && !events.last().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenAllFieldsBecomeValid() {
        startActivity().use { scenario ->
            CvcOnlyValidationInstrumentedTestsActivity.run { activity ->
                activity.setCvc("123")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 2
                        && events.last().name == "AccessCheckoutCvcOnlyValidationEvent"
                        && events.last().stringOf("type") == "all"
                        && events.last().booleanOf("isValid")
            }
        }
    }

    private fun startActivity(): ActivityScenario<CvcOnlyValidationInstrumentedTestsActivity> {
        val scenario = ActivityScenario.launch(CvcOnlyValidationInstrumentedTestsActivity::class.java)

        scenario.onActivity { activity ->
            activity.clearEventsReceived()
        }

        assertEventsReceived(scenario) { events ->
            events.isEmpty()
        }

        return scenario
    }

    private fun assertEventsReceived(
        scenario: ActivityScenario<CvcOnlyValidationInstrumentedTestsActivity>?,
        assertion: (List<EventMock>) -> Boolean
    ) {
        await().atMost(timeOutInMs, MILLISECONDS).until {
            val eventsReceived: MutableList<EventMock> = CopyOnWriteArrayList()
            scenario!!.onActivity { activity ->
                eventsReceived.addAll(activity.eventsReceived())
            }

            assertion.invoke(eventsReceived)
        }
    }
}
