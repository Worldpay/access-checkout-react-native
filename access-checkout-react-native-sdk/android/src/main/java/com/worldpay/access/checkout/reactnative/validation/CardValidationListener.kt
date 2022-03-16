package com.worldpay.access.checkout.reactnative.validation

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.worldpay.access.checkout.client.validation.listener.AccessCheckoutCardValidationListener
import com.worldpay.access.checkout.client.validation.model.CardBrand

/**
 * Internal implementation of the [AccessCheckoutCardValidationListener] that uses the reactContext
 * to emit events to JS with the validation result information that is given by the Access Checkout SDK.
 *
 * Each event will contain an object that JS can then use to extract information
 */
class CardValidationListener(private val reactContext: ReactApplicationContext): AccessCheckoutCardValidationListener {

  private val eventName = "AccessCheckoutCardValidationEvent"

  /**
   * Handles the brand change event given by ACO SDK.
   *
   * This method will eventually emit an event with one of the following two objects:
   *
   * Unrecognised brand:
   * { type: "brand", value: null }
   *
   * Recognised brand:
   * { type: "brand", value: { images: [ {type: 'image/png', url: '<some-url>' }, {type: 'image/svg', url: '<some-url>' } ] }  }
   *
   * @param cardBrand [CardBrand?] represents the new card brand or null if brand is not recognised
   */
  override fun onBrandChange(cardBrand: CardBrand?) {
    if (cardBrand == null) {
      val resultData = WritableNativeMap()
      resultData.putString("type", "brand")
      resultData.putNull("value")

      sendEvent(reactContext, resultData)
    } else {

      val writableNativeArray = WritableNativeArray()

      for (image in cardBrand.images) {
        val images = WritableNativeMap()
        images.putString("type", image.type)
        images.putString("url", image.url)
        writableNativeArray.pushMap(images)
      }

      val cardBrandMap = WritableNativeMap()
      cardBrandMap.putString("name", cardBrand.name)
      cardBrandMap.putArray("images", writableNativeArray)

      val resultData = WritableNativeMap()
      resultData.putString("type", "brand")
      resultData.putMap("value", cardBrandMap)

      sendEvent(reactContext, resultData)
    }
  }

  /**
   * Handles the cvc validated event given by ACO SDK.
   *
   * This method will eventually emit an event with the following object:
   *
   * { type: 'cvc', isValid: true/false }
   *
   * @param isValid [Boolean] represents whether the cvc is valid or not
   */
  override fun onCvcValidated(isValid: Boolean) {
    val resultData = WritableNativeMap()
    resultData.putString("type", "cvc")
    resultData.putBoolean("isValid", isValid)

    sendEvent(reactContext, resultData)
  }

  /**
   * Handles the expiry date validated event given by ACO SDK.
   *
   * This method will eventually emit an event with the following object:
   *
   * { type: 'expiry', isValid: true/false }
   *
   * @param isValid [Boolean] represents whether the expiry date is valid or not
   */
  override fun onExpiryDateValidated(isValid: Boolean) {
    val resultData = WritableNativeMap()
    resultData.putString("type", "expiry")
    resultData.putBoolean("isValid", isValid)

    sendEvent(reactContext, resultData)
  }

  /**
   * Handles the pan validated event given by ACO SDK.
   *
   * This method will eventually emit an event with the following object:
   *
   * { type: 'pan', isValid: true/false }
   *
   * @param isValid [Boolean] represents whether the pan is valid or not
   */
  override fun onPanValidated(isValid: Boolean) {
    val resultData = WritableNativeMap()
    resultData.putString("type", "pan")
    resultData.putBoolean("isValid", isValid)

    sendEvent(reactContext, resultData)
  }

  /**
   * Handles the validation success event (called when all fields are valid)
   *
   * This method will eventually emit an event with the following object:
   *
   * { type: 'all', isValid: true/false }
   */
  override fun onValidationSuccess() {
    val resultData = WritableNativeMap()
    resultData.putString("type", "all")
    resultData.putBoolean("isValid", true)

    sendEvent(reactContext, resultData)
  }

  /**
   * Sends the given [params] event using the react context and the eventName
   */
  private fun sendEvent(reactContext: ReactContext, params: WritableMap) {
    reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
  }
}
