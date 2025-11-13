package com.worldpay.access.checkout.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.UIManagerHelper
import com.worldpay.access.checkout.ui.AccessCheckoutEditText

/**
 * Mirrors the Swift ReactNativeViewLocator.
 * Lookup order:
 * 1. Registry (nativeID -> viewTag) resolved through UIManager (Fabric/Paper).
 * 2. Fallback recursive nativeID search in the Activity root hierarchy.
 */
class ReactNativeViewLocator(private val reactContext: ReactApplicationContext) {

    private val registry = mutableMapOf<String, Int>()

    fun register(viewTag: Int, nativeId: String) {
        registry[nativeId] = viewTag
    }

    fun clear() {
        registry.clear()
    }

    fun locateAccessCheckoutEditText(nativeId: String): AccessCheckoutEditText {
        return findView(nativeId)
    }

    /**
     * Resolves a previously registered view by its React Native nativeId.
     * Important: This method must be called within the UI thread this ensures:
     * UIManager is available, and compatibility with both Fabric and Paper architectures
     * Resolution strategy:
     * 1. Primary: Attempt to obtain the React Native UIManager (supports both Paper & Fabric) via
     *    UIManagerHelper.getUIManager and then call resolveView(viewTag).
     * 2. Fallback: If the UIManager is not yet initialised fall back to the
     * current Activity's view hierarchy using findViewById(viewTag).
     *
     * Notes:
     * - Relying solely on UIManager lookups proved inconsistent under very specific circumstances
     * - Maintaining the tag registry allows lightweight resolution without traversing the hierarchy
     *
     * @param nativeId The React Native nativeId string used during registration.
     * @return The resolved view cast to the requested type T.
     * @throws IllegalArgumentException If no view tag was registered for the supplied nativeId.
     * @throws IllegalStateException If the view cannot be resolved by either strategy.
     */
    private fun <T> findView(nativeId: String): T {
        val viewTag = registry[nativeId]
            ?: throw IllegalArgumentException("No view registered for nativeId=$nativeId")

        // Use universal resolver (supports Fabric + Paper)
        UIManagerHelper.getUIManager(reactContext, viewTag)
            ?.resolveView(viewTag)
            ?.let {
                @Suppress("UNCHECKED_CAST")
                return it as T
            }

        // Fallback: Activity hierarchy
        reactContext.currentActivity
            ?.findViewById<AccessCheckoutEditText?>(viewTag)
            ?.let {
                @Suppress("UNCHECKED_CAST")
                return it as T
            }

        throw IllegalStateException("Unable to resolve view for nativeId=$nativeId tag=$viewTag")
    }
}
