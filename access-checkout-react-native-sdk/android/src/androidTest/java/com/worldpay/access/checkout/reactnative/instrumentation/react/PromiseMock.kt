package com.worldpay.access.checkout.reactnative.instrumentation.react

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap

class PromiseMock : Promise {
    var resolvedValue: Any? = null
        private set

    var rejectedCode: String? = null
        private set

    var rejectedMessage: String? = null
        private set

    override fun resolve(value: Any?) {
        this.resolvedValue = value
    }

    override fun reject(code: String?, message: String?) {
        this.rejectedCode = code
        this.rejectedMessage = message
    }

    override fun reject(code: String?, throwable: Throwable?) {
        throw RuntimeException("Not yet implemented")
    }

    override fun reject(code: String?, message: String?, throwable: Throwable?) {
        throw RuntimeException("Not yet implemented")
    }

    override fun reject(throwable: Throwable?) {
        throw RuntimeException("Not yet implemented")
    }

    override fun reject(throwable: Throwable?, userInfo: WritableMap?) {
        throw RuntimeException("Not yet implemented")
    }

    override fun reject(code: String?, userInfo: WritableMap) {
        throw RuntimeException("Not yet implemented")
    }

    override fun reject(code: String?, throwable: Throwable?, userInfo: WritableMap?) {
        throw RuntimeException("Not yet implemented")
    }

    override fun reject(code: String?, message: String?, userInfo: WritableMap) {
        throw RuntimeException("Not yet implemented")
    }

    override fun reject(
        code: String?,
        message: String?,
        throwable: Throwable?,
        userInfo: WritableMap?
    ) {
        throw RuntimeException("Not yet implemented")
    }

    @Deprecated("", ReplaceWith(""))
    override fun reject(message: String?) {
        throw RuntimeException("Not yet implemented")
    }
}