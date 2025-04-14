package com.worldpay.access.checkout.reactnative

import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.util.ReactFindViewUtil
import com.worldpay.access.checkout.client.session.AccessCheckoutClient
import com.worldpay.access.checkout.client.session.AccessCheckoutClientBuilder
import com.worldpay.access.checkout.client.session.model.CardDetails
import com.worldpay.access.checkout.client.session.model.SessionType
import com.worldpay.access.checkout.client.validation.AccessCheckoutValidationInitialiser
import com.worldpay.access.checkout.client.validation.config.CardValidationConfig
import com.worldpay.access.checkout.client.validation.config.CvcValidationConfig
import com.worldpay.access.checkout.reactnative.session.GenerateSessionsConfigConverter
import com.worldpay.access.checkout.reactnative.session.SessionResponseListenerImpl
import com.worldpay.access.checkout.reactnative.validation.CardValidationConfigConverter
import com.worldpay.access.checkout.reactnative.validation.CardValidationListener
import com.worldpay.access.checkout.reactnative.validation.CvcOnlyValidationConfigConverter
import com.worldpay.access.checkout.reactnative.validation.CvcOnlyValidationListener
import com.worldpay.access.checkout.session.AccessCheckoutClientDisposer
import com.worldpay.access.checkout.session.api.client.WpSdkHeader
import com.worldpay.access.checkout.ui.AccessCheckoutEditText

/**
 * Module class that implements all the functionality that is required by Javascript for the end user
 *
 * The responsibility of this class is to provide react methods that are then exposed for the JS to use.
 */
class AccessCheckoutReactNativeModule constructor(
    private val reactContext: ReactApplicationContext,
    private val accessCheckoutClientDisposer: AccessCheckoutClientDisposer = AccessCheckoutClientDisposer()
) : ReactContextBaseJavaModule(reactContext) {

    private var accessCheckoutClient: AccessCheckoutClient? = null
    private val sessionResponseListener = SessionResponseListenerImpl()

    /**
     * Retrieves the name of the module that the JS is to refer to this by.
     *
     * Important: This must be the returning the same value as the module in ios
     *
     * In Javascript, this module can be referred by using the following:
     *
     * const { AccessCheckoutReactNative } = ReactNative.NativeModules;
     */
    override fun getName() = "AccessCheckoutReactNative"

    /**
     * Exposes the generateSession method to JS
     *
     * @ReactMethod annotation is needed as all native modules that need to be invoked must have this annotation
     *
     * @param readableMap [ReadableMap] represents the configuration object that the generate sessions function will use
     * @param promise [Promise] represents the JS promise that the corresponding JS method will return
     */
    @ReactMethod
    fun generateSessions(readableMap: ReadableMap, promise: Promise) {
        Handler(Looper.getMainLooper()).post {
            try {
                val config = GenerateSessionsConfigConverter().fromReadableMap(readableMap)

                val wpSdkHeaderValue =
                    "access-checkout-react-native/${config.reactNativeSdkVersion}"
                WpSdkHeader.overrideValue(wpSdkHeaderValue)

                if (accessCheckoutClient == null) {
                    accessCheckoutClient = AccessCheckoutClientBuilder()
                        .baseUrl(config.baseUrl)
                        .merchantId(config.merchantId)
                        .sessionResponseListener(sessionResponseListener)
                        .context(reactApplicationContext)
                        .lifecycleOwner(getLifecycleOwner())
                        .build()
                }

                sessionResponseListener.promise = promise

                val panView = findView<AccessCheckoutEditText>(config.panId!!)
                val expiryDateView = findView<AccessCheckoutEditText>(config.expiryDateId!!)
                val cvcView = findView<AccessCheckoutEditText>(config.cvcId!!)

                val cardDetails: CardDetails = if (isCvcSessionOnly(config.sessionTypes)) {
                    CardDetails.Builder()
                        .cvc(cvcView)
                        .build()
                } else {
                    CardDetails.Builder()
                        .pan(panView)
                        .expiryDate(expiryDateView)
                        .cvc(cvcView)
                        .build()
                }

                accessCheckoutClient!!.generateSessions(cardDetails, config.sessionTypes)

            } catch (exception: RuntimeException) {
                promise.reject(exception)
            }
        }
    }

    /**
     * Exposes the generateSession method to JS
     *
     * @ReactMethod annotation is needed as all native modules that need to be invoked must have this annotation
     *
     * @param readableMap [ReadableMap] represents the configuration object that the validation function will use
     * @param promise [Promise] represents the JS promise that the corresponding JS method will return
     */
    @ReactMethod
    fun initialiseCardValidation(readableMap: ReadableMap, promise: Promise) {
        try {
            val config = CardValidationConfigConverter().fromReadableMap(readableMap)

            val panView = findView<AccessCheckoutEditText>(config.panId)
            val expiryDateView = findView<AccessCheckoutEditText>(config.expiryDateId)
            val cvcView = findView<AccessCheckoutEditText>(config.cvcId)

            val cardValidationConfigBuilder = CardValidationConfig.Builder()
                .baseUrl(config.baseUrl)
                .pan(panView)
                .expiryDate(expiryDateView)
                .cvc(cvcView)
                .validationListener(CardValidationListener(reactContext))
                .lifecycleOwner(getLifecycleOwner())
                .acceptedCardBrands(config.acceptedCardBrands)

            if (config.enablePanFormatting) {
                cardValidationConfigBuilder.enablePanFormatting()
            }

            Handler(Looper.getMainLooper()).post {
                try {
                    AccessCheckoutValidationInitialiser.initialise(cardValidationConfigBuilder.build())
                    promise.resolve(true)
                } catch (ex: Exception) {
                    promise.reject(ex)
                }
            }
        } catch (ex: Exception) {
            promise.reject(ex)
        }
    }

    /**
     * Exposes the generateSession method to JS
     *
     * @ReactMethod annotation is needed as all native modules that need to be invoked must have this annotation
     *
     * @param readableMap [ReadableMap] represents the configuration object that the validation function will use
     * @param promise [Promise] represents the JS promise that the corresponding JS method will return
     */
    @ReactMethod
    fun initialiseCvcOnlyValidation(readableMap: ReadableMap, promise: Promise) {
        try {
            val config = CvcOnlyValidationConfigConverter().fromReadableMap(readableMap)

            val cvcView = findView<AccessCheckoutEditText>(config.cvcId)

            val cvcOnlyValidationConfigBuilder = CvcValidationConfig.Builder()
                .cvc(cvcView)
                .validationListener(CvcOnlyValidationListener(reactContext))
                .lifecycleOwner(getLifecycleOwner())

            Handler(Looper.getMainLooper()).post {
                try {
                    AccessCheckoutValidationInitialiser.initialise(cvcOnlyValidationConfigBuilder.build())
                    promise.resolve(true)
                } catch (ex: Exception) {
                    promise.reject(ex)
                }
            }
        } catch (ex: Exception) {
            promise.reject(ex)
        }
    }

    /**
     * Required to prevent a warning from being displayed when running react-native >= 0.65
     */
    @Suppress("UNUSED_PARAMETER", "unused")
    @ReactMethod
    fun addListener(eventName: String?) {

    }

    /**
     * Required to prevent a warning from being displayed when running react-native >= 0.65
     */
    @Suppress("UNUSED_PARAMETER", "unused")
    @ReactMethod
    fun removeListeners(count: Double) {

    }

    override fun onCatalystInstanceDestroy() {
        if (accessCheckoutClient != null) {
            accessCheckoutClientDisposer.dispose(accessCheckoutClient!!)
            Log.d(javaClass.simpleName, "AccessCheckoutClient dispose successfully called")
        }
    }

    private fun getLifecycleOwner() = (reactContext.currentActivity as LifecycleOwner)


    private fun isCvcSessionOnly(sessionType: List<SessionType>): Boolean {
        return sessionType.count() == 1 && sessionType.first() == SessionType.CVC
    }

    private fun <T> findView(viewId: String): T {
        val rootView = reactContext.currentActivity?.window?.decorView?.rootView
        @Suppress("UNCHECKED_CAST")
        return ReactFindViewUtil.findView(rootView, viewId) as T
    }
}