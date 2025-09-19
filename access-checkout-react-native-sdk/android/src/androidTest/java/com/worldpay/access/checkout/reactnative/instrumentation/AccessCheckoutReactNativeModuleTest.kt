package com.worldpay.access.checkout.reactnative.instrumentation

import android.content.Context
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.client.session.AccessCheckoutClient
import com.worldpay.access.checkout.client.session.AccessCheckoutClientBuilder
import com.worldpay.access.checkout.client.session.listener.SessionResponseListener
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.ui.EmptyInstrumentedTestsActivity
import com.worldpay.access.checkout.session.AccessCheckoutClientDisposer
import org.junit.Before
import org.junit.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import kotlin.jvm.java


class AccessCheckoutReactNativeModuleTest {
    private val context: Context = InstrumentationRegistry.getInstrumentation().context

    @Before
    fun setUp() {
        SoLoader.init(context, false)
    }

    @Test
    fun onCatalystInstanceDestroyShouldRunTheAccessCheckoutClientDisposer() {
        val scenario = ActivityScenario.launch(EmptyInstrumentedTestsActivity::class.java)
        val accessCheckoutClientDisposer = mock(AccessCheckoutClientDisposer::class.java)

        scenario.onActivity { activity ->
            val accessCheckoutClient = AccessCheckoutClientBuilder()
                .baseUrl("http://some-base-url")
                .checkoutId("merchant-id")
                .context(context)
                .lifecycleOwner(activity)
                .sessionResponseListener(mock(SessionResponseListener::class.java))
                .build()

            val nativeModule =
                createNativeModule(accessCheckoutClientDisposer, accessCheckoutClient)

            nativeModule.onCatalystInstanceDestroy()

            verify(accessCheckoutClientDisposer).dispose(accessCheckoutClient)
        }
    }

    private fun createNativeModule(
        disposer: AccessCheckoutClientDisposer, client: AccessCheckoutClient
    ): AccessCheckoutReactNativeModule {
        val reactApplicationContext = mock(ReactApplicationContext::class.java)

        val module = AccessCheckoutReactNativeModule(reactApplicationContext, disposer)

        val accessCheckoutClientField = AccessCheckoutReactNativeModule::class.java
            .getDeclaredField("accessCheckoutClient")
        accessCheckoutClientField.isAccessible = true
        accessCheckoutClientField.set(module, client)

        return module
    }
}
