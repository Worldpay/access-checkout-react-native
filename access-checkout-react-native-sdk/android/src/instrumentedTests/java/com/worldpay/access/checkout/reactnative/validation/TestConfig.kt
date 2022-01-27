package com.worldpay.access.checkout.reactnative.validation

import kotlin.collections.ArrayList

class TestConfig {
    companion object {
        private val INSTANCE = TestConfig()

        private const val BASE_URL = "https://localhost:8443/"

        fun baseUrl(): String {
            return BASE_URL
        }

        fun testConfig(): TestConfig {
            return INSTANCE
        }

        fun panId(): String {
            return INSTANCE.panId
        }

        fun expiryDateId(): String {
            return INSTANCE.expiryDateId
        }

        fun cvcId(): String {
            return INSTANCE.cvcId
        }

        fun enablePanFormatting(): Boolean {
            return INSTANCE.enablePanFormatting
        }

        fun acceptedCardBrands(): List<String> {
            return INSTANCE.acceptedCardBrands
        }
    }

    private var panId: String = ""
    private var expiryDateId: String = ""
    private var cvcId: String = ""
    private var enablePanFormatting = false
    private var acceptedCardBrands: MutableList<String> = ArrayList()

    fun panId(panId: String): TestConfig {
        this.panId = panId
        return this
    }

    fun expiryDateId(expiryDateId: String): TestConfig {
        this.expiryDateId = expiryDateId
        return this
    }

    fun cvcId(cvcId: String): TestConfig {
        this.cvcId = cvcId
        return this
    }

    fun acceptedCardBrands(cardBrands: List<String>): TestConfig {
        acceptedCardBrands.addAll(cardBrands)
        return this
    }

    fun clear(): TestConfig {
        INSTANCE.panId = ""
        INSTANCE.expiryDateId = ""
        INSTANCE.cvcId = ""
        INSTANCE.enablePanFormatting = false
        INSTANCE.acceptedCardBrands.clear()
        return this
    }
}