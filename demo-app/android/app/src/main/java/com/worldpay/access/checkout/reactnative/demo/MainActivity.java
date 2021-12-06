package com.worldpay.access.checkout.reactnative.demo;

import android.app.Application;

import com.worldpay.access.checkout.reactnative.demo.BuildConfig;
import com.facebook.react.PackageList;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.worldpay.access.checkout.reactnative.AccessCheckoutReactNativePackage;

import java.util.List;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AccessCheckoutReactNativeDemo";
  }

  public static class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
        new ReactNativeHost(this) {
          @Override
          public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
          }

          @Override
          protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for AccessCheckoutReactNativeDemo:
            // packages.add(new MyReactNativePackage());
            packages.add(new AccessCheckoutReactNativePackage());
            return packages;
          }

          @Override
          protected String getJSMainModuleName() {
            return "index";
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
    }
  }
}
