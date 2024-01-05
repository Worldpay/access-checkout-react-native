package com.worldpay.access.checkout.reactnative

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.worldpay.access.checkout.reactnative.ui.AccessCheckoutTextInputManager

/**
 * This class is responsible for registering native modules with React Native. (called upon initialisation)
 */
class AccessCheckoutReactPackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(AccessCheckoutReactNativeModule(reactContext))
    }
    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ) = listOf(AccessCheckoutTextInputManager(reactContext))
}
