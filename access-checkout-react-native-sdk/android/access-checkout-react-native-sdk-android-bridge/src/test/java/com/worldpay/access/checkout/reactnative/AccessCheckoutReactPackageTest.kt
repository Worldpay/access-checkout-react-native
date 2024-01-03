package com.worldpay.access.checkout.reactnative

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.ReactApplicationContext
import com.worldpay.access.checkout.reactnative.ui.AccessCheckoutTextInputManager
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
internal class AccessCheckoutReactPackageTest {
    private val acoReactPackage = AccessCheckoutReactPackage()

    @Test
    fun `createNativeModules() should return list with one AccessCheckoutReactNativeModule`() {
        val nativeModules = acoReactPackage.createNativeModules(reactApplicationContext())

        assertThat(nativeModules).hasSize(1)
        assertThat(nativeModules[0]).isInstanceOf(AccessCheckoutReactNativeModule::class.java)
    }

    @Test
    fun `createViewManagers() should return a list with a single instance of AccessCheckoutEditTextManager`() {
        val viewManagers = acoReactPackage.createViewManagers(reactApplicationContext())

        assertThat(viewManagers).hasSize(1)
        assertThat(viewManagers[0]).isInstanceOf(AccessCheckoutTextInputManager::class.java)
    }

    private fun reactApplicationContext(): ReactApplicationContext {
        val applicationContext: Context = ApplicationProvider.getApplicationContext()
        return ReactApplicationContext(applicationContext)
    }
}
