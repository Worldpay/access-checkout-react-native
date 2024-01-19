package com.worldpay.access.checkout.reactnative.demo;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactPackage;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AccessCheckoutReactNativeDemo";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
    public static class MainApplication extends Application implements ReactApplication {

        private final ReactNativeHost mReactNativeHost =
                new DefaultReactNativeHost(this) {
                    @Override
                    public boolean getUseDeveloperSupport() {
                        return BuildConfig.DEBUG;
                    }

                    @Override
                    protected List<ReactPackage> getPackages() {
                        @SuppressWarnings("UnnecessaryLocalVariable")
                        List<ReactPackage> packages = new PackageList(this).getPackages();
                        // Packages that cannot be autolinked yet can be added manually here, for AccessCheckoutReactNativeDemo:
                        packages.add(new AccessCheckoutReactPackage());
                        return packages;
                    }

                    @Override
                    protected String getJSMainModuleName() {
                        return "index";
                    }

                    @Override
                    protected boolean isNewArchEnabled() {
                        return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
                    }

                    @Override
                    protected Boolean isHermesEnabled() {
                        return BuildConfig.IS_HERMES_ENABLED;
                    }
                };

        @Override
        public ReactNativeHost getReactNativeHost() {
            return mReactNativeHost;
        }

        @Override
        public void onCreate() {
            super.onCreate();
            SoLoader.init(this, /* native exopackage */ false);
            if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
                // If you opted-in for the New Architecture, we load the native entry point for this app.
                DefaultNewArchitectureEntryPoint.load();
            }
        }
    }
}
