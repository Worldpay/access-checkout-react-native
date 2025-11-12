package com.worldpay.access.checkout.reactnative.ui.react

import android.app.Activity
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.CatalystInstance
import com.facebook.react.bridge.JavaScriptContextHolder
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UIManager
import com.facebook.react.turbomodule.core.interfaces.CallInvokerHolder
import java.lang.Exception

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

    override fun isBridgeless(): Boolean {
        TODO("Not yet implemented")
    }

    override fun getJavaScriptContextHolder(): JavaScriptContextHolder? {
        TODO("Not yet implemented")
    }

    override fun getJSCallInvokerHolder(): CallInvokerHolder? {
        TODO("Not yet implemented")
    }

    override fun getFabricUIManager(): UIManager? {
        TODO("Not yet implemented")
    }

    override fun getSourceURL(): String? {
        TODO("Not yet implemented")
    }

    override fun registerSegment(
        p0: Int,
        p1: String?,
        p2: Callback?
    ) {
        TODO("Not yet implemented")
    }

    override fun <T : JavaScriptModule?> getJSModule(jsInterface: Class<T>?): T {
        @Suppress("UNCHECKED_CAST")
        return rtcDeviceEventEmitter as T
    }

    override fun <T : NativeModule?> hasNativeModule(p0: Class<T?>?): Boolean {
        TODO("Not yet implemented")
    }

    override fun getNativeModules(): Collection<NativeModule?>? {
        TODO("Not yet implemented")
    }

    override fun <T : NativeModule?> getNativeModule(p0: Class<T?>?): T? {
        TODO("Not yet implemented")
    }

    override fun getNativeModule(p0: String?): NativeModule? {
        TODO("Not yet implemented")
    }

    override fun getCatalystInstance(): CatalystInstance? {
        TODO("Not yet implemented")
    }

    override fun hasActiveCatalystInstance(): Boolean {
        TODO("Not yet implemented")
    }

    override fun hasActiveReactInstance(): Boolean {
        TODO("Not yet implemented")
    }

    override fun hasCatalystInstance(): Boolean {
        TODO("Not yet implemented")
    }

    override fun hasReactInstance(): Boolean {
        TODO("Not yet implemented")
    }

    override fun destroy() {
        TODO("Not yet implemented")
    }

    override fun handleException(p0: Exception?) {
        TODO("Not yet implemented")
    }
}
