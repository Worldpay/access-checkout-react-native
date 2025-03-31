package com.worldpay.access.checkout.reactnative

import android.os.Bundle
import android.widget.LinearLayout
import androidx.activity.ComponentActivity
import com.facebook.react.R
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.react.EventMock
import com.worldpay.access.checkout.reactnative.react.MockReactApplicationContext.Companion.mockReactApplicationContext
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.cvcId
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.expiryDateId
import com.worldpay.access.checkout.reactnative.utils.TestConstants.Companion.panId
import com.worldpay.access.checkout.ui.AccessCheckoutEditText
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope

abstract class AbstractInstrumentedTestsActivity : ComponentActivity(),
    CoroutineScope by MainScope() {
    lateinit var panAccessCheckoutEditText: AccessCheckoutEditText
    lateinit var expiryDateAccessCheckoutEditText: AccessCheckoutEditText
    lateinit var cvcAccessCheckoutEditText: AccessCheckoutEditText

    protected val reactApplicationContext = mockReactApplicationContext(this)

    fun setPan(value: String) {
        panAccessCheckoutEditText.setText(value)
    }

    fun setExpiryDate(value: String) {
        expiryDateAccessCheckoutEditText.setText(value)
    }

    fun setCvc(value: String) {
        cvcAccessCheckoutEditText.setText(value)
    }

    fun eventsReceived(): List<EventMock> {
        return reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted
    }

    fun clearEventsReceived() {
        reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted.clear()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)

        panAccessCheckoutEditText = createAccessCheckoutEditText(panId)
        expiryDateAccessCheckoutEditText = createAccessCheckoutEditText(expiryDateId)
        cvcAccessCheckoutEditText = createAccessCheckoutEditText(cvcId)

        val layout = LinearLayout(this)
        layout.addView(panAccessCheckoutEditText)
        layout.addView(expiryDateAccessCheckoutEditText)
        layout.addView(cvcAccessCheckoutEditText)
        setContentView(layout)

        val module = AccessCheckoutReactNativeModule(reactApplicationContext)

        doOnCreate(module)
    }

    protected abstract fun doOnCreate(module: AccessCheckoutReactNativeModule)

    private fun createAccessCheckoutEditText(id: String): AccessCheckoutEditText {
        val component = AccessCheckoutEditText(this)
        component.setTag(R.id.view_tag_native_id, id)
        return component
    }
}
