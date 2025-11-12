package com.worldpay.access.checkout.reactnative.ui

import android.os.Bundle
import android.view.View
import android.widget.LinearLayout
import androidx.activity.ComponentActivity
import com.facebook.react.BuildConfig
import com.facebook.react.R
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.ui.react.EventMock
import com.worldpay.access.checkout.reactnative.ui.react.MockReactApplicationContext.Companion.mockReactApplicationContext
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.cvcId
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.expiryDateId
import com.worldpay.access.checkout.reactnative.ui.utils.TestConstants.Companion.panId
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

        SoLoader.init(this, OpenSourceMergedSoMapping)

        panAccessCheckoutEditText = createAccessCheckoutEditText(panId)
        expiryDateAccessCheckoutEditText = createAccessCheckoutEditText(expiryDateId)
        cvcAccessCheckoutEditText = createAccessCheckoutEditText(cvcId)

        val layout = LinearLayout(this)
        layout.addView(panAccessCheckoutEditText)
        layout.addView(expiryDateAccessCheckoutEditText)
        layout.addView(cvcAccessCheckoutEditText)
        setContentView(layout)

        val module = AccessCheckoutReactNativeModule(reactApplicationContext)

        // Register views (nativeId -> viewTag) so that they are registered within the View Registry
        registerForModule(module, panAccessCheckoutEditText, panId)
        registerForModule(module, expiryDateAccessCheckoutEditText, expiryDateId)
        registerForModule(module, cvcAccessCheckoutEditText, cvcId)

        doOnCreate(module)
    }

    protected abstract fun doOnCreate(module: AccessCheckoutReactNativeModule)

    private fun createAccessCheckoutEditText(id: String): AccessCheckoutEditText {
        val component = AccessCheckoutEditText(this)
        component.setTag(R.id.view_tag_native_id, id)
        component.id = View.generateViewId() // assign a unique Android view id (used as viewTag)
        return component
    }

    private fun registerForModule(
        module: AccessCheckoutReactNativeModule,
        editText: AccessCheckoutEditText,
        nativeId: String
    ) {
        module.registerView(editText.id, nativeId)
    }
}
