package com.worldpay.access.checkout.reactnative.validation

import android.os.Bundle
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView.BufferType.EDITABLE
import androidx.activity.ComponentActivity
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.PromiseImpl
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativeModule
import com.worldpay.access.checkout.reactnative.R
import com.worldpay.access.checkout.reactnative.react.EventMock
import com.worldpay.access.checkout.reactnative.react.FailureCallback
import com.worldpay.access.checkout.reactnative.react.MockReactApplicationContext.Companion.mockReactApplicationContext
import com.worldpay.access.checkout.reactnative.react.SuccessCallback
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.util.concurrent.Executors
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.TimeUnit.MILLISECONDS
import kotlin.coroutines.suspendCoroutine

class CvcOnlyValidationInstrumentedTestsActivity : ComponentActivity(),
    CoroutineScope by MainScope() {

    companion object {
        const val cvcId = "cvcId"

        const val bridgeFieldCvcId = "cvcId"

        private val actions = LinkedBlockingQueue<((CvcOnlyValidationInstrumentedTestsActivity) -> Unit)>()

        fun run(action: (CvcOnlyValidationInstrumentedTestsActivity) -> Unit) {
            actions.offer(action)
        }

        fun clearActions() {
            actions.clear()
        }
    }

    private val scheduledExecutorService = Executors.newScheduledThreadPool(4)
    private val reactApplicationContext = mockReactApplicationContext(this)

    var cvcEditText: EditText? = null

    fun eventsReceived(): List<EventMock> {
        return reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted
    }

    fun clearEventsReceived() {
        reactApplicationContext.rtcDeviceEventEmitter.eventsEmitted.clear()
    }

    fun setCvc(value: String) {
        cvcEditText!!.setText(value, EDITABLE)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)

        cvcEditText = createEditText(cvcId)

        val layout = LinearLayout(this)
        layout.addView(cvcEditText)
        setContentView(layout)

        val validationArguments = testFixtureToReadableMap()
        val module = AccessCheckoutReactNativeModule(reactApplicationContext)

        launch {
            initialiseCvcOnlyValidation(module, validationArguments)
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

    private fun testFixtureToReadableMap(): JavaOnlyMap {
        val arguments = JavaOnlyMap()
        arguments.putString(bridgeFieldCvcId, ValidationTestFixture.cvcId())

        return arguments
    }

    private suspend fun initialiseCvcOnlyValidation(
        module: AccessCheckoutReactNativeModule,
        arguments: JavaOnlyMap
    ): Boolean = suspendCoroutine { continuation ->
        val promise = PromiseImpl(
            SuccessCallback(continuation),
            FailureCallback(continuation)
        )

        module.initialiseCvcOnlyValidation(arguments, promise)
    }

    private fun createEditText(id: String): EditText {
        val editText = EditText(this)
        editText.setTag(R.id.view_tag_native_id, id)
        return editText
    }
}