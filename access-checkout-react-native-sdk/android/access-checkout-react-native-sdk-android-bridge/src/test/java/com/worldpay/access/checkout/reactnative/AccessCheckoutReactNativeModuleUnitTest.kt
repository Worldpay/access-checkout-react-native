package com.worldpay.access.checkout.reactnative

import com.facebook.react.bridge.ReactMethod
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

internal class AccessCheckoutReactNativeModuleUnitTest {
    @Test
    fun `module has a React method called addListener() with one String parameter`() {
        val method = AccessCheckoutReactNativeModule::class.java
            .getMethod("addListener", String::class.java)

        assertThat(method).isNotNull
        assertThat(method.getAnnotation(ReactMethod::class.java)).isNotNull
    }

    @Test
    fun `module has a React method called removeListeners() with one Double parameter`() {
        val method = AccessCheckoutReactNativeModule::class.java
            .getMethod("removeListeners", Double::class.java)

        assertThat(method).isNotNull
        assertThat(method.getAnnotation(ReactMethod::class.java)).isNotNull
    }
}