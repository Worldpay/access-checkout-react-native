package com.worldpay.access.checkout.reactnative.instrumentedTests.validation

import android.os.Bundle
import android.view.KeyEvent
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.ComponentActivity
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.R
import com.worldpay.access.checkout.reactnative.instrumentedTests.react.EventMock
import com.worldpay.access.checkout.reactnative.instrumentedTests.react.FailureCallback
import com.worldpay.access.checkout.reactnative.instrumentedTests.react.MockReactApplicationContext.Companion.mockReactApplicationContext
import com.worldpay.access.checkout.reactnative.instrumentedTests.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.instrumentedTests.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.BASE_URL_FIELD
import com.worldpay.access.checkout.reactnative.instrumentedTests.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.CVC_ID_FIELD
import com.worldpay.access.checkout.reactnative.instrumentedTests.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.ENABLE_PAN_FORMATTING_FIELD
import com.worldpay.access.checkout.reactnative.instrumentedTests.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.EXPIRY_DATE_ID_FIELD
import com.worldpay.access.checkout.reactnative.instrumentedTests.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.PAN_ID_FIELD
import com.worldpay.access.checkout.reactnative.instrumentedTests.validation.ValidationTestFixture.Companion.validationTestFixture
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.util.concurrent.Executors
import kotlin.coroutines.suspendCoroutine


class ValidationInstrumentedTestsActivity : ComponentActivity(),
    CoroutineScope by MainScope() {

    private val reactApplicationContext = mockReactApplicationContext(this)

    var panEditText: EditText? = null
    var expiryDateEditText: EditText? = null
    var cvcEditText: EditText? = null

    fun eventsReceived(): List<EventMock> {
        return reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)

        panEditText = createEditText(ValidationTestFixture.panId())
        setPan("4")
        expiryDateEditText = createEditText(ValidationTestFixture.expiryDateId())
        cvcEditText = createEditText(ValidationTestFixture.cvcId())

        val layout = LinearLayout(this)
        layout.addView(panEditText)
        layout.addView(expiryDateEditText)
        layout.addView(cvcEditText)
        setContentView(layout)
    }

    override fun onStart() {
        super.onStart()

        val arguments = JavaOnlyMap()
        arguments.putString(BASE_URL_FIELD, ValidationTestFixture.baseUrl())
        arguments.putString(PAN_ID_FIELD, ValidationTestFixture.panId())
        arguments.putString(EXPIRY_DATE_ID_FIELD, ValidationTestFixture.expiryDateId())
        arguments.putString(CVC_ID_FIELD, ValidationTestFixture.cvcId())
        arguments.putBoolean(
            ENABLE_PAN_FORMATTING_FIELD,
            ValidationTestFixture.enablePanFormatting()
        )

        val module = AccessCheckoutReactNativeModule(reactApplicationContext)
        val activity = this

        launch {
            initialiseValidation(module, arguments)

            // ToDo - This should not be here but it looks like the SDK raises a pan isValid = false event at start up when wiring the validation in a 2nd activity
            reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted.clear()
            validationTestFixture().steps!!.invoke(activity)
        }
    }

    private suspend fun initialiseValidation(
        module: AccessCheckoutReactNativeModule,
        arguments: JavaOnlyMap
    ): Boolean =
        suspendCoroutine { continuation ->
            val promise = PromiseImpl(
                SuccessCallback(continuation),
                FailureCallback(continuation)
            )

            module.initialiseValidation(arguments, promise)
        }

    private fun createEditText(id: String): EditText {
        val editText = EditText(this)
        editText.setTag(R.id.view_tag_native_id, id)
        return editText
    }

    fun setPan(value: String) {
        panEditText!!.setText(value, TextView.BufferType.EDITABLE)
    }

    fun typeInPan(key: Int) {
        panEditText!!.setSelection(panEditText!!.text.length)
        panEditText!!.dispatchKeyEvent(KeyEvent(0, 0, KeyEvent.ACTION_DOWN, key, 0))
    }

    fun setExpiryDate(value: String) {
        expiryDateEditText!!.setText(value, TextView.BufferType.EDITABLE)
    }

    fun setCvc(value: String) {
        cvcEditText!!.setText(value, TextView.BufferType.EDITABLE)
    }

    class BridgeValidationFieldNames {
        companion object {
            const val BASE_URL_FIELD = "baseUrl"
            const val PAN_ID_FIELD = "panId"
            const val EXPIRY_DATE_ID_FIELD = "expiryId"
            const val CVC_ID_FIELD = "cvcId"
            const val ENABLE_PAN_FORMATTING_FIELD = "enablePanFormatting"
            const val ACCEPTED_CARD_BRANDS_FIELD = "acceptedCardBrands"
        }
    }

}