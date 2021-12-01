package com.worldpay.access.checkout.reactnative

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.ReactApplicationContext
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
internal class AccessCheckoutReactNativePackageTest {
    private val acoReactNativePackage = AccessCheckoutReactNativePackage()

    @Test
    fun `createNativeModules() should return list with one AccessCheckoutReactNativeModule`() {
        val nativeModules = acoReactNativePackage.createNativeModules(reactApplicationContext())

        assertThat(nativeModules).hasSize(1)
        assertThat(nativeModules[0]).isInstanceOf(AccessCheckoutReactNativeModule::class.java)
    }

    @Test
    fun `createViewManagers() should not create view managers`() {
        val viewManagers = acoReactNativePackage.createViewManagers(reactApplicationContext())

        assertThat(viewManagers).isEmpty()
    }

    private fun reactApplicationContext(): ReactApplicationContext {
        val applicationContext: Context = ApplicationProvider.getApplicationContext()
        return ReactApplicationContext(applicationContext)
    }
}
