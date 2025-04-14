package com.worldpay.access.checkout.reactnative.ui.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.concurrent.CopyOnWriteArrayList

class RCTDeviceEventEmitterMock : DeviceEventManagerModule.RCTDeviceEventEmitter {
    val eventsEmitted: MutableList<EventMock> = CopyOnWriteArrayList()

    @Synchronized
    override fun emit(eventName: String, data: Any?) {
        eventsEmitted.add(EventMock(eventName, data))
    }
}

class EventMock(val name: String, val data: Any?) {
    fun stringOf(eventFieldName: String): Any? {
        return (data as ReadableMap).getString(eventFieldName)
    }

    fun booleanOf(eventFieldName: String): Boolean {
        return (data as ReadableMap).getBoolean(eventFieldName)
    }

    fun mapOf(eventFieldName: String): ReadableMap? {
        val map = (data as ReadableMap).getMap(eventFieldName)
        return map
    }
}