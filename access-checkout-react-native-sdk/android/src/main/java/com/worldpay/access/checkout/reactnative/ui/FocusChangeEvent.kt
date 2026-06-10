package com.worldpay.access.checkout.reactnative.ui

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class FocusChangeEvent(surfaceId: Int, viewTag: Int, val isFocused: Boolean) : Event<FocusChangeEvent>() {
    init {
        super.init(surfaceId, viewTag)
    }

    public override fun getEventData(): WritableMap? {
        val event = Arguments.createMap()
        event.putBoolean("isFocused", isFocused)
        return event
    }

    override fun getEventName(): String {
        return "topFocusChange"
    }
}
