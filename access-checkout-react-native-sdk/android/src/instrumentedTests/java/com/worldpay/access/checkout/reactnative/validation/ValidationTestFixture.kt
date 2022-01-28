package com.worldpay.access.checkout.reactnative.validation

class ValidationTestFixture {
    companion object {
        private val INSTANCE = ValidationTestFixture()

        private const val BASE_URL = "https://localhost:8443/"

        fun baseUrl(): String {
            return BASE_URL
        }

        fun validationTestFixture(): ValidationTestFixture {
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

    fun panId(panId: String): ValidationTestFixture {
        this.panId = panId
        return this
    }

    fun expiryDateId(expiryDateId: String): ValidationTestFixture {
        this.expiryDateId = expiryDateId
        return this
    }

    fun cvcId(cvcId: String): ValidationTestFixture {
        this.cvcId = cvcId
        return this
    }

    fun acceptedCardBrands(cardBrands: List<String>): ValidationTestFixture {
        acceptedCardBrands.addAll(cardBrands)
        return this
    }

    fun clear(): ValidationTestFixture {
        INSTANCE.panId = ""
        INSTANCE.expiryDateId = ""
        INSTANCE.cvcId = ""
        INSTANCE.enablePanFormatting = false
        INSTANCE.acceptedCardBrands.clear()
        return this
    }
}