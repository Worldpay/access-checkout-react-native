package com.worldpay.access.checkout.reactnative.instrumentedTests

import android.app.Activity
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.ReactApplicationContext

class MockReactApplicationContext(context: Context, activity: Activity) :
    ReactApplicationContext(context) {
    companion object {
        fun mockReactApplicationContext(activity: Activity): ReactApplicationContext {
            val applicationContext: Context = ApplicationProvider.getApplicationContext()
            return MockReactApplicationContext(applicationContext, activity)
        }
    }

    var activity: Activity? = activity

    override fun getCurrentActivity(): Activity? {
        return if (activity == null) {
            null
        } else activity
    }

}