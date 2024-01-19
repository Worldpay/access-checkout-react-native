package com.worldpay.access.checkout.reactnative.demo

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactActivity
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactPackage

class MainActivity : ReactActivity() {
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "AccessCheckoutReactNativeDemo"
    }

    class MainApplication : Application(), ReactApplication {
        override val reactNativeHost: ReactNativeHost = object : ReactNativeHost(this) {
            override fun getUseDeveloperSupport(): Boolean {
                return BuildConfig.DEBUG
            }

            override fun getPackages(): List<ReactPackage> {
                val packages: MutableList<ReactPackage> = PackageList(this).packages
                // Packages that cannot be autolinked yet can be added manually here, for AccessCheckoutReactNativeDemo:
                packages.add(AccessCheckoutReactPackage())
                return packages
            }

            override fun getJSMainModuleName(): String {
                return "index"
            }
        }

        override fun onCreate() {
            super.onCreate()
            SoLoader.init(this,  /* native exopackage */false)
        }
    }
}
