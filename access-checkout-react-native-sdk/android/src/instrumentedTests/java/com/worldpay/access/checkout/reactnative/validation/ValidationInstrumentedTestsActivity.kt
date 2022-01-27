package com.worldpay.access.checkout.reactnative.validation

import android.os.Bundle
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView.BufferType.EDITABLE
import androidx.activity.ComponentActivity
import com.facebook.react.bridge.JavaOnlyArray
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.R
import com.worldpay.access.checkout.reactnative.react.EventMock
import com.worldpay.access.checkout.reactnative.react.FailureCallback
import com.worldpay.access.checkout.reactnative.react.MockReactApplicationContext.Companion.mockReactApplicationContext
import com.worldpay.access.checkout.reactnative.react.SuccessCallback
import com.worldpay.access.checkout.reactnative.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.ACCEPTED_CARD_BRANDS_FIELD
import com.worldpay.access.checkout.reactnative.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.BASE_URL_FIELD
import com.worldpay.access.checkout.reactnative.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.CVC_ID_FIELD
import com.worldpay.access.checkout.reactnative.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.ENABLE_PAN_FORMATTING_FIELD
import com.worldpay.access.checkout.reactnative.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.EXPIRY_DATE_ID_FIELD
import com.worldpay.access.checkout.reactnative.validation.ValidationInstrumentedTestsActivity.BridgeValidationFieldNames.Companion.PAN_ID_FIELD
import com.worldpay.access.checkout.reactnative.validation.TestConfig.Companion.testConfig
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.util.concurrent.Executors
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.TimeUnit.MILLISECONDS
import kotlin.coroutines.suspendCoroutine


class ValidationInstrumentedTestsActivity : ComponentActivity(),
    CoroutineScope by MainScope() {

    companion object {
        const val panId = "panId"
        const val expiryDateId = "expiryDateId"
        const val cvcId = "cvcId"

        private val actions = LinkedBlockingQueue<((ValidationInstrumentedTestsActivity) -> Unit)>()

        fun run(action: (ValidationInstrumentedTestsActivity) -> Unit) {
            actions.offer(action)
        }

        fun clearActions() {
            actions.clear()
        }
    }

    private val configurationTimeoutInMs = 5000L

    private val scheduledExecutorService = Executors.newScheduledThreadPool(4)

    private val reactApplicationContext = mockReactApplicationContext(this)

    var panEditText: EditText? = null
    var expiryDateEditText: EditText? = null
    var cvcEditText: EditText? = null

    fun eventsReceived(): List<EventMock> {
        return reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted
    }

    fun clearEventsReceived() {
        reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted.clear()
    }

    fun setPan(value: String) {
        panEditText!!.setText(value, EDITABLE)
    }

    fun setExpiryDate(value: String) {
        expiryDateEditText!!.setText(value, EDITABLE)
    }

    fun setCvc(value: String) {
        cvcEditText!!.setText(value, EDITABLE)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)

        panEditText = createEditText(panId)
        expiryDateEditText = createEditText(expiryDateId)
        cvcEditText = createEditText(cvcId)

        val layout = LinearLayout(this)
        layout.addView(panEditText)
        layout.addView(expiryDateEditText)
        layout.addView(cvcEditText)
        setContentView(layout)

        val validationArguments = toReadableMap(testConfig())
        val module = AccessCheckoutReactNativeModule(reactApplicationContext)

        launch {
            initialiseValidation(module, validationArguments)
        }
    }

    override fun onStart() {
        super.onStart()

        val pollStepsQueue = {
            while (true) {
                val action = actions.poll()
                if (action != null) {
                    runOnUiThread { action.invoke(this) }
                }
                Thread.sleep(100L)
            }
        }

        scheduledExecutorService.schedule(pollStepsQueue, 500, MILLISECONDS)

    }

    override fun onStop() {
        super.onStop()

        scheduledExecutorService.shutdownNow()
    }

    private fun toReadableMap(testConfig: TestConfig): JavaOnlyMap {
        val arguments = JavaOnlyMap()
        arguments.putString(BASE_URL_FIELD, TestConfig.baseUrl())
        arguments.putString(PAN_ID_FIELD, TestConfig.panId())
        arguments.putString(EXPIRY_DATE_ID_FIELD, TestConfig.expiryDateId())
        arguments.putString(CVC_ID_FIELD, TestConfig.cvcId())
        arguments.putBoolean(ENABLE_PAN_FORMATTING_FIELD, TestConfig.enablePanFormatting())

        val acceptedCardBrands = JavaOnlyArray()
        TestConfig.acceptedCardBrands()
            .forEach { brand -> acceptedCardBrands.pushString(brand) }
        arguments.putArray(ACCEPTED_CARD_BRANDS_FIELD, acceptedCardBrands)
        return arguments
    }

    private suspend fun initialiseValidation(
        module: AccessCheckoutReactNativeModule,
        arguments: JavaOnlyMap
    ): Boolean = suspendCoroutine { continuation ->
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