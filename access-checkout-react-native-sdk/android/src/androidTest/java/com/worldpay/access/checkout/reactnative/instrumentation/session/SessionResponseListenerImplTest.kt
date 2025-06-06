package com.worldpay.access.checkout.reactnative.instrumentation.session

import android.content.Context
import androidx.test.platform.app.InstrumentationRegistry
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.client.api.exception.AccessCheckoutException
import com.worldpay.access.checkout.client.session.model.SessionType.CARD
import com.worldpay.access.checkout.client.session.model.SessionType.CVC
import com.worldpay.access.checkout.reactnative.instrumentation.react.PromiseMock
import com.worldpay.access.checkout.reactnative.session.SessionResponseListenerImpl
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test

class SessionResponseListenerImplTest {
    private val listener = SessionResponseListenerImpl()
    private val promise = PromiseMock()

    @Before
    fun setUp() {
        val context: Context = InstrumentationRegistry.getInstrumentation().context
        SoLoader.init(context, false)

        listener.promise = promise
    }

    @Test
    fun shouldResolvePromiseWithMapContainingOnlyACardSessionWhenReceivingOnlyCardSession() {
        val map = mapOf(CARD to "card-session")

        listener.onSuccess(map)

        val expectedMap = WritableNativeMap()
        expectedMap.putString("card", "card-session")
        assertThat(promise.resolvedValue).isEqualTo(expectedMap)
    }

    @Test
    fun shouldResolvePromiseWithMapContainingOnlyACvcSessionWhenReceivingOnlyCvcSession() {
        val map = mapOf(CVC to "cvc-session")

        listener.onSuccess(map)

        val expectedMap = WritableNativeMap()
        expectedMap.putString("cvc", "cvc-session")
        assertThat(promise.resolvedValue).isEqualTo(expectedMap)
    }

    @Test
    fun shouldResolvePromiseWithMapContainingACardAndACvcSessionWhenReceivingCardAndCvcSessions() {
        val map = mapOf(CARD to "card-session", CVC to "cvc-session")

        listener.onSuccess(map)

        val expectedMap = WritableNativeMap()
        expectedMap.putString("card", "card-session")
        expectedMap.putString("cvc", "cvc-session")
        assertThat(promise.resolvedValue).isEqualTo(expectedMap)
    }

    @Test
    fun shouldResolvePromiseWithAnErrorWhenReceivingOnlyCvcSession() {
        val expectedMessage = "Failed to create session"
        val exception = AccessCheckoutException(expectedMessage)

        listener.onError(exception)

        assertThat(promise.rejectedMessage).isEqualTo(expectedMessage)
    }
}