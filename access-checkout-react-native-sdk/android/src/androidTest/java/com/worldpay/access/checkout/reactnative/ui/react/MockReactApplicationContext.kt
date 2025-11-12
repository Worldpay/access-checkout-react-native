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

class MockReactApplicationContext(context: Context, private val activity: Activity?) :
    ReactApplicationContext(context) {

    constructor(context: Context) : this(context, null)

    companion object {
        fun mockReactApplicationContext(activity: Activity): MockReactApplicationContext {
            val applicationContext: Context = ApplicationProvider.getApplicationContext()
            return MockReactApplicationContext(applicationContext, activity)
        }
    }

    // Mock JS module (DeviceEventEmitter etc.)
    val rtcDeviceEventEmitter = RCTDeviceEventEmitterMock()

    // Simple stubs / state
    private val javaScriptContextHolder = JavaScriptContextHolder(0L)
    private var catalystInstance: CatalystInstance? = null
    private val nativeModules = mutableMapOf<String, NativeModule>()
    private var destroyed = false
    private var lastException: Exception? = null

    // Allow tests to inject modules / catalyst instance
    fun addNativeModule(module: NativeModule) {
        nativeModules[module.name] = module
    }

    fun setCatalystInstance(instance: CatalystInstance?) {
        catalystInstance = instance
    }

    fun getLastException(): Exception? = lastException

    override fun getCurrentActivity(): Activity? = activity

    override fun isBridgeless(): Boolean = false

    override fun getJavaScriptContextHolder(): JavaScriptContextHolder = javaScriptContextHolder

    override fun getJSCallInvokerHolder(): CallInvokerHolder? = null

    override fun getFabricUIManager(): UIManager? = null

    override fun getSourceURL(): String = "mock://source"

    override fun registerSegment(p0: Int, p1: String?, p2: Callback?) {
        // Immediately invoke callback to simulate successful segment registration
        p2?.invoke(true)
    }

    @Suppress("UNCHECKED_CAST")
    override fun <T : JavaScriptModule?> getJSModule(jsInterface: Class<T>?): T {
        return rtcDeviceEventEmitter as T
    }

    @Suppress("UNCHECKED_CAST")
    override fun <T : NativeModule?> hasNativeModule(p0: Class<T?>?): Boolean {
        if (p0 == null) return false
        return nativeModules.values.any { p0.isInstance(it) }
    }

    override fun getNativeModules(): Collection<NativeModule> = nativeModules.values

    @Suppress("UNCHECKED_CAST")
    override fun <T : NativeModule?> getNativeModule(p0: Class<T?>?): T? {
        if (p0 == null) return null
        return nativeModules.values.firstOrNull { p0.isInstance(it) } as T?
    }

    override fun getNativeModule(p0: String?): NativeModule? {
        if (p0 == null) return null
        return nativeModules[p0]
    }

    override fun getCatalystInstance(): CatalystInstance? = catalystInstance

    override fun hasActiveCatalystInstance(): Boolean = catalystInstance != null && !destroyed

    override fun hasActiveReactInstance(): Boolean = hasActiveCatalystInstance()

    override fun hasCatalystInstance(): Boolean = catalystInstance != null

    override fun hasReactInstance(): Boolean = hasCatalystInstance()

    override fun destroy() {
        destroyed = true
        nativeModules.clear()
        catalystInstance = null
    }

    override fun handleException(p0: Exception?) {
        lastException = p0
        // For tests, rethrow to fail fast if needed
        if (p0 != null) throw p0
    }
}