package com.worldpay.access.checkout.reactnative.instrumentedTests.react

import android.app.Activity
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.ReactApplicationContext

class MockReactApplicationContext(context: Context, private val activity: Activity?) :
    ReactApplicationContext(context) {
    constructor(context: Context) : this(context, null)

    companion object {
        fun mockReactApplicationContext(activity: Activity): MockReactApplicationContext {
            val applicationContext: Context = ApplicationProvider.getApplicationContext()
            return MockReactApplicationContext(applicationContext, activity)
        }
    }

    val rtcDeviceEventEmitter = RCTDeviceEventEmitterMock()

    override fun getCurrentActivity(): Activity? {
        return activity
    }

    override fun <T : JavaScriptModule?> getJSModule(jsInterface: Class<T>?): T {
        return rtcDeviceEventEmitter as T
    }

}