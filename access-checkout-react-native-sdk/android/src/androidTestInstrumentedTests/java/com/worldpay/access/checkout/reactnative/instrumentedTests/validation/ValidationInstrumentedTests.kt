package com.worldpay.access.checkout.reactnative.instrumentedTests.validation

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.worldpay.access.checkout.reactnative.instrumentedTests.react.EventMock
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.CardBrandsStub.Companion.stubCardBrandsRules
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.MockServer.startWiremock
import com.worldpay.access.checkout.reactnative.instrumentedTests.stubs.MockServer.stopWiremock
import com.worldpay.access.checkout.reactnative.instrumentedTests.validation.ValidationTestFixture.Companion.validationTestFixture
import org.awaitility.Awaitility.await
import org.junit.After
import org.junit.Before
import org.junit.Test
import java.util.concurrent.CopyOnWriteArrayList
import java.util.concurrent.TimeUnit
import kotlin.random.Random

class ValidationInstrumentedTests {
    val TIMEOUT_IN_SECONDS = 5000L

    var scenario: ActivityScenario<ValidationInstrumentedTestsActivity>? = null

    @Before
    fun setUp() {
        validationTestFixture()
            .clear()
            .panId("pan" + Random.nextInt())
            .expiryDateId("expiryDate" + Random.nextInt())
            .cvcId("cvc" + Random.nextInt())
    }

    @After
    fun tearDown() {
        scenario!!.close()
    }


    @Test
    fun shouldRaiseEventWhenPanBecomesValid() {
        validationTestFixture().steps { activity ->
            activity.setPan("4444333322221111")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        assertEventsReceived(scenario) { events ->
            events.last().name == "AccessCheckoutValidationEvent"
                    && events.last().stringOf("type") == "pan"
                    && events.last().booleanOf("isValid")
        }
    }

    @Test
    fun shouldRaiseEventWhenPanBecomesInvalid() {
        validationTestFixture().steps { activity ->
            activity.setPan("4444333322221111")
            activity.setPan("4")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        // Todo - we should assert that the Expiry Date was first invalid
        assertEventsReceived(scenario) { events ->
            events.size == 2
                    && events.last().name == "AccessCheckoutValidationEvent"
                    && events.last().stringOf("type") == "pan"
                    && !events.last().booleanOf("isValid")
        }
    }

    @Test
    fun shouldRaiseEventWhenExpiryDateBecomesValid() {
        validationTestFixture().steps { activity ->
            activity.setExpiryDate("12/30")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        assertEventsReceived(scenario) { events ->
            events.size == 1
                    && events.last().name == "AccessCheckoutValidationEvent"
                    && events.last().stringOf("type") == "expiry"
                    && events.last().booleanOf("isValid")
        }
    }

    @Test
    fun shouldRaiseEventWhenExpiryDateBecomesInvalid() {
        validationTestFixture().steps { activity ->
            activity.setExpiryDate("12/30")
            activity.setExpiryDate("12/3")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        // Todo - we should assert that the Expiry Date was first invalid
        assertEventsReceived(scenario) { events ->
            events.size == 2
                    && events.last().name == "AccessCheckoutValidationEvent"
                    && events.last().stringOf("type") == "expiry"
                    && !events.last().booleanOf("isValid")
        }
    }

    @Test
    fun shouldRaiseEventWhenCvcBecomesValid() {
        validationTestFixture().steps { activity ->
            activity.setCvc("123")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        assertEventsReceived(scenario) { events ->
            events.size == 1
                    && events.last().name == "AccessCheckoutValidationEvent"
                    && events.last().stringOf("type") == "cvc"
                    && events.last().booleanOf("isValid")
        }
    }

    @Test
    fun shouldRaiseEventWhenCvcBecomesInvalid() {
        validationTestFixture().steps { activity ->
            activity.setCvc("123")
            activity.setCvc("12")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        // Todo - we should assert that the CVC was first invalid
        assertEventsReceived(scenario) { events ->
            events.size == 2
                    && events.last().name == "AccessCheckoutValidationEvent"
                    && events.last().stringOf("type") == "cvc"
                    && !events.last().booleanOf("isValid")
        }
    }

    @Test
    fun shouldRaiseEventWhenAllFieldsBecomeValid() {
        validationTestFixture().steps { activity ->
            activity.setPan("4444333322221111")
            activity.setExpiryDate("12/30")
            activity.setCvc("123")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        assertEventsReceived(scenario) { events ->
            events.size == 4
                    && events.last().name == "AccessCheckoutValidationEvent"
                    && events.last().stringOf("type") == "all"
                    && events.last().booleanOf("isValid")
        }
    }

    @Test
    fun shouldRaiseEventWhenRecognisingCardBrand() {
        val applicationContext: Context = InstrumentationRegistry.getInstrumentation()
            .context.applicationContext
        startWiremock(applicationContext, 8443)
        stubCardBrandsRules()

        validationTestFixture().steps { activity ->
            activity.setPan("4")
        }

        scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        assertEventsContain(scenario) { event ->
            val cardBrand = CardBrandEvent(event.mapOf("value"))

            event.name == "AccessCheckoutValidationEvent"
                    && event.stringOf("type") == "brand"
                    && cardBrand.name == "visa"
                    && cardBrand.images[0].url == "https://localhost:8443/access-checkout/assets/visa.png"
                    && cardBrand.images[0].type == "image/png"
                    && cardBrand.images[1].url == "https://localhost:8443/access-checkout/assets/visa.svg"
                    && cardBrand.images[1].type == "image/svg+xml"
        }

        stopWiremock()
    }

    private fun assertEventsReceived(
        scenario: ActivityScenario<ValidationInstrumentedTestsActivity>?,
        assertion: (List<EventMock>) -> Boolean
    ) {
        await().atMost(TIMEOUT_IN_SECONDS, TimeUnit.SECONDS).until {
            val eventsReceived: MutableList<EventMock> = CopyOnWriteArrayList()
            scenario!!.onActivity { activity ->
                eventsReceived.addAll(activity.eventsReceived())
            }

            assertion.invoke(eventsReceived)
        }
    }

    private fun assertEventsContain(
        scenario: ActivityScenario<ValidationInstrumentedTestsActivity>?,
        assertion: (EventMock) -> Boolean
    ) {
        await().atMost(TIMEOUT_IN_SECONDS, TimeUnit.SECONDS).until {
            var eventsReceived: List<EventMock> = emptyList()
            scenario!!.onActivity { activity ->
                eventsReceived = activity.eventsReceived()
            }

            var result = false
            eventsReceived.forEach { event ->
                if (assertion.invoke(event)) {
                    result = true
                }
            }

            result
        }
    }
}