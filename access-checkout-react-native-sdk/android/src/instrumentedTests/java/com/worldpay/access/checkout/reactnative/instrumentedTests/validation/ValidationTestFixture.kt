package com.worldpay.access.checkout.reactnative.instrumentedTests.validation

import java.util.concurrent.LinkedBlockingQueue

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
    }

    var panId: String = ""
    var expiryDateId: String = ""
    var cvcId: String = ""
    var enablePanFormatting = false

    var steps: ((ValidationInstrumentedTestsActivity) -> Unit)? = null

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

    fun steps(steps: (ValidationInstrumentedTestsActivity) -> Unit) {
        this.steps = steps
    }

    fun clear(): ValidationTestFixture {
        INSTANCE.panId = ""
        INSTANCE.expiryDateId = ""
        INSTANCE.cvcId = ""
        INSTANCE.enablePanFormatting = false
        INSTANCE.steps = null
        return this
    }
}