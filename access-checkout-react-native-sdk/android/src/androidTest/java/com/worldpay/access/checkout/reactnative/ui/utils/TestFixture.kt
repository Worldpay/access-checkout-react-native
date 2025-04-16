package com.worldpay.access.checkout.reactnative.ui.utils

class TestFixture {
    companion object {
        private val INSTANCE = TestFixture()

        const val CARD = "card"
        const val CVC = "cvc"

        fun testFixture(): TestFixture {
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

        fun enablePanFormatting(): Boolean {
            return INSTANCE.enablePanFormatting
        }

        fun acceptedCardBrands(): List<String> {
            return INSTANCE.acceptedCardBrands
        }
    }

    private var pan: String? = null
    private var expiryDate: String? = null
    private var cvc: String? = null
    private var sessionsTypes: MutableList<String> = ArrayList()
    private var reactNativeSdkVersion: String? = null
    private var enablePanFormatting = false
    private var acceptedCardBrands: MutableList<String> = ArrayList()

    fun pan(pan: String?): TestFixture {
        this.pan = pan
        return this
    }

    fun expiryDate(expiryDate: String?): TestFixture {
        this.expiryDate = expiryDate
        return this
    }

    fun cvc(cvc: String?): TestFixture {
        this.cvc = cvc
        return this
    }

    fun sessionsTypes(sessionsTypes: List<String>): TestFixture {
        this.sessionsTypes.clear()
        this.sessionsTypes.addAll(sessionsTypes)
        return this
    }

    fun reactNativeSdkVersion(reactNativeSdkVersion: String?): TestFixture {
        this.reactNativeSdkVersion = reactNativeSdkVersion
        return this
    }

    fun acceptedCardBrands(cardBrands: List<String>): TestFixture {
        acceptedCardBrands.addAll(cardBrands)
        return this
    }

    fun clear(): TestFixture {
        INSTANCE.pan = null
        INSTANCE.expiryDate = null
        INSTANCE.cvc = null
        INSTANCE.sessionsTypes.clear()
        INSTANCE.reactNativeSdkVersion = null
        INSTANCE.enablePanFormatting = false
        INSTANCE.acceptedCardBrands.clear()
        return this
    }
}
