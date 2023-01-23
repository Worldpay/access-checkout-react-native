package com.worldpay.access.checkout.reactnative.session

class SessionsTestFixture {
    companion object {
        private val INSTANCE = SessionsTestFixture()

        private const val BASE_URL = "https://localhost:8443/"
        private const val MERCHANT_ID = "some-id"

        const val CARD = "card"
        const val CVC = "cvc"

        fun baseUrl(): String {
            return BASE_URL
        }

        fun merchantId(): String {
            return MERCHANT_ID
        }

        fun sessionsTextFixture(): SessionsTestFixture {
            return INSTANCE
        }

        fun pan(): String? {
            return INSTANCE.pan
        }

        fun expiryDate(): String? {
            return INSTANCE.expiryDate
        }

        fun cvc(): String? {
            return INSTANCE.cvc
        }

        fun sessionsTypes(): List<String> {
            return INSTANCE.sessionsTypes
        }

        fun reactNativeSdkVersion(): String? {
            return INSTANCE.reactNativeSdkVersion
        }
    }

    var pan: String? = null
    var expiryDate: String? = null
    var cvc: String? = null
    var sessionsTypes: MutableList<String> = ArrayList()
    var reactNativeSdkVersion: String? = null

    fun pan(pan: String?): SessionsTestFixture {
        this.pan = pan
        return this
    }

    fun expiryDate(expiryDate: String?): SessionsTestFixture {
        this.expiryDate = expiryDate
        return this
    }

    fun cvc(cvc: String?): SessionsTestFixture {
        this.cvc = cvc
        return this
    }

    fun sessionsTypes(sessionsTypes: List<String>): SessionsTestFixture {
        this.sessionsTypes.clear()
        this.sessionsTypes.addAll(sessionsTypes)
        return this
    }

    fun reactNativeSdkVersion(reactNativeSdkVersion: String?): SessionsTestFixture {
        this.reactNativeSdkVersion = reactNativeSdkVersion
        return this
    }

    fun clear(): SessionsTestFixture {
        INSTANCE.pan = null
        INSTANCE.expiryDate = null
        INSTANCE.cvc = null
        INSTANCE.sessionsTypes.clear()
        INSTANCE.reactNativeSdkVersion = null
        return this
    }
}
