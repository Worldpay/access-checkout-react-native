package com.worldpay.access.checkout.reactnative.instrumentedTests.react

import android.app.Activity
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.*

class MockReactApplicationContext(context: Context, activity: Activity) :
    ReactApplicationContext(context) {
    companion object {
        fun mockReactApplicationContext(activity: Activity): MockReactApplicationContext {
            val applicationContext: Context = ApplicationProvider.getApplicationContext()
            return MockReactApplicationContext(applicationContext, activity)
        }
    }

    val rtcDeviceEventEmitter = RCTDeviceEventEmitterMock()

    var activity: Activity? = activity

    override fun getCurrentActivity(): Activity? {
        return if (activity == null) {
            null
        } else activity
    }

    override fun <T : JavaScriptModule?> getJSModule(jsInterface: Class<T>?): T {
        return rtcDeviceEventEmitter as T
    }

}