package com.worldpay.access.checkout.reactnative.validation

class CardValidationTestFixture {
    companion object {
        private val INSTANCE = CardValidationTestFixture()

        private const val BASE_URL = "https://localhost:8443/"

        fun baseUrl(): String {
            return BASE_URL
        }

        fun validationTestFixture(): CardValidationTestFixture {
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

    fun panId(panId: String): CardValidationTestFixture {
        this.panId = panId
        return this
    }

    fun expiryDateId(expiryDateId: String): CardValidationTestFixture {
        this.expiryDateId = expiryDateId
        return this
    }

    fun cvcId(cvcId: String): CardValidationTestFixture {
        this.cvcId = cvcId
        return this
    }

    fun acceptedCardBrands(cardBrands: List<String>): CardValidationTestFixture {
        acceptedCardBrands.addAll(cardBrands)
        return this
    }

    fun clear(): CardValidationTestFixture {
        INSTANCE.panId = ""
        INSTANCE.expiryDateId = ""
        INSTANCE.cvcId = ""
        INSTANCE.enablePanFormatting = false
        INSTANCE.acceptedCardBrands.clear()
        return this
    }
}