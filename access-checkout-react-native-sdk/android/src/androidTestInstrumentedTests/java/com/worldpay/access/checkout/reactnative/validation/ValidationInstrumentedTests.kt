package com.worldpay.access.checkout.reactnative.validation

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.github.tomakehurst.wiremock.client.VerificationException
import com.github.tomakehurst.wiremock.client.WireMock
import com.worldpay.access.checkout.reactnative.react.EventMock
import com.worldpay.access.checkout.reactnative.services.CardBrandsStub.Companion.stubCardBrandsRules
import com.worldpay.access.checkout.reactnative.services.MockServer
import com.worldpay.access.checkout.reactnative.services.MockServer.startStubServices
import com.worldpay.access.checkout.reactnative.services.MockServer.stopStubServices
import com.worldpay.access.checkout.reactnative.validation.ValidationTestFixture.Companion.validationTestFixture
import org.awaitility.Awaitility.await
import org.junit.*
import java.util.concurrent.CopyOnWriteArrayList
import java.util.concurrent.TimeUnit.MILLISECONDS

class ValidationInstrumentedTests {
    private val timeOutInMs = 10000L

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
        validationTestFixture()
            .clear()
            .panId(ValidationInstrumentedTestsActivity.panId)
            .expiryDateId(ValidationInstrumentedTestsActivity.expiryDateId)
            .cvcId(ValidationInstrumentedTestsActivity.cvcId)

        ValidationInstrumentedTestsActivity.clearActions()
    }

    @After
    fun tearDown() {
        WireMock.reset()
    }

    @Test
    fun shouldRaiseEventWhenPanBecomesValid() {
        startActivity().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setPan("4444333322221111")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 1
                        && events.first().name == "AccessCheckoutCardValidationEvent"
                        && events.first().stringOf("type") == "pan"
                        && events.first().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenPanBecomesInvalid() {
        startActivity().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setPan("4444333322221111")
                activity.setPan("4")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 2
                        && events.first().name == "AccessCheckoutCardValidationEvent"
                        && events.first().stringOf("type") == "pan"
                        && events.first().booleanOf("isValid")

                        && events.last().name == "AccessCheckoutCardValidationEvent"
                        && events.last().stringOf("type") == "pan"
                        && !events.last().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenExpiryDateBecomesValid() {
        startActivity().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setExpiryDate("12/30")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 1
                        && events.first().name == "AccessCheckoutCardValidationEvent"
                        && events.first().stringOf("type") == "expiryDate"
                        && events.first().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenExpiryDateBecomesInvalid() {
        startActivity().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setExpiryDate("12/30")
                activity.setExpiryDate("12/3")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 2
                        && events.first().name == "AccessCheckoutCardValidationEvent"
                        && events.first().stringOf("type") == "expiryDate"
                        && events.first().booleanOf("isValid")

                        && events.last().name == "AccessCheckoutCardValidationEvent"
                        && events.last().stringOf("type") == "expiryDate"
                        && !events.last().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenCvcBecomesValid() {
        startActivity().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setCvc("123")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 1
                        && events.first().name == "AccessCheckoutCardValidationEvent"
                        && events.first().stringOf("type") == "cvc"
                        && events.first().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenCvcBecomesInvalid() {
        startActivity().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setCvc("123")
                activity.setCvc("12")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 2
                        && events.first().name == "AccessCheckoutCardValidationEvent"
                        && events.first().stringOf("type") == "cvc"
                        && events.first().booleanOf("isValid")

                        && events.last().name == "AccessCheckoutCardValidationEvent"
                        && events.last().stringOf("type") == "cvc"
                        && !events.last().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenAllFieldsBecomeValid() {
        startActivity().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setPan("4444333322221111")
                activity.setExpiryDate("12/30")
                activity.setCvc("123")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 4
                        && events.last().name == "AccessCheckoutCardValidationEvent"
                        && events.last().stringOf("type") == "all"
                        && events.last().booleanOf("isValid")
            }
        }
    }

    @Test
    fun shouldRaiseEventWhenRecognisingCardBrand() {
        startActivityWithCardBrandRules().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setPan("4")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 1 &&
                        events.first().name == "AccessCheckoutCardValidationEvent" &&
                        events.first().stringOf("type") == "brand" &&
                        events.first().mapOf("value")?.getString("name") == "visa" &&
                        events.first().mapOf("value")?.getArray("images")
                            ?.getMap(0)
                            ?.getString("type") == "image/png" &&
                        events.first().mapOf("value")?.getArray("images")
                            ?.getMap(0)
                            ?.getString("url") == "https://localhost:8443/access-checkout/assets/visa.png" &&
                        events.first().mapOf("value")?.getArray("images")
                            ?.getMap(1)
                            ?.getString("type") == "image/svg+xml" &&
                        events.first().mapOf("value")?.getArray("images")
                            ?.getMap(1)
                            ?.getString("url") == "https://localhost:8443/access-checkout/assets/visa.svg"
            }
        }
    }

    @Test
    fun shouldRaiseAnInvalidPanEventWhenCardBrandIsNotAcceptedByMerchant() {
        validationTestFixture().acceptedCardBrands(listOf("jcb"))

        startActivityWithCardBrandRules().use { scenario ->
            ValidationInstrumentedTestsActivity.run { activity ->
                activity.setPan("4")
            }

            assertEventsReceived(scenario) { events ->
                events.size == 2
                        && events.first().name == "AccessCheckoutCardValidationEvent"
                        && events.first().stringOf("type") == "brand"
                        && events.last().name == "AccessCheckoutCardValidationEvent"
                        && events.last().stringOf("type") == "pan"
                        && !events.last().booleanOf("isValid")
            }
        }
    }

    private fun startActivity(): ActivityScenario<ValidationInstrumentedTestsActivity> {
        val scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)

        scenario.onActivity { activity ->
            activity.clearEventsReceived()
        }

        assertEventsReceived(scenario) { events ->
            events.isEmpty()
        }

        return scenario
    }

    private fun startActivityWithCardBrandRules(): ActivityScenario<ValidationInstrumentedTestsActivity> {
        stubCardBrandsRules()

        val scenario = ActivityScenario.launch(ValidationInstrumentedTestsActivity::class.java)
        waitUntilCardConfigurationHasBeenLoaded(timeOutInMs)

        scenario.onActivity { activity ->
            activity.clearEventsReceived()
        }

        assertEventsReceived(scenario) { events ->
            events.isEmpty()
        }

        return scenario
    }

    private fun assertEventsReceived(
        scenario: ActivityScenario<ValidationInstrumentedTestsActivity>?,
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

    private fun waitUntilCardConfigurationHasBeenLoaded(timeoutInMilliseconds: Long) {
        await().atMost(timeoutInMilliseconds, MILLISECONDS).until {
            try {
                WireMock.verify(WireMock.getRequestedFor(WireMock.urlEqualTo("/access-checkout/cardTypes.json")))
                true
            } catch (e: VerificationException) {
                false
            }
        }
    }
}
