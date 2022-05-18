package com.worldpay.access.checkout.reactnative.validation

class CvcOnlyValidationTestFixture {
    companion object {
        private val INSTANCE = CvcOnlyValidationTestFixture()

        private const val BASE_URL = "https://localhost:8443/"

        fun baseUrl(): String {
            return BASE_URL
        }

        fun cvcOnlyValidationTestFixture(): CvcOnlyValidationTestFixture {
            return INSTANCE
        }

        fun cvcId(): String {
            return INSTANCE.cvcId
        }
    }

    private var cvcId: String = ""

    fun cvcId(cvcId: String): CvcOnlyValidationTestFixture {
        this.cvcId = cvcId
        return this
    }

    fun clear(): CvcOnlyValidationTestFixture {
        INSTANCE.cvcId = ""
        return this
    }
}