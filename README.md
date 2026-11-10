# Access Checkout React Native SDK 

![](worldpay_logo.png)

**Build Status**: ![](https://app.bitrise.io/app/7c9d34547d2631cb/status.svg?token=d4DIyXeuCdqvXY8oOOBkZA&branch=master)

## Prerequisites

1. Install the following tools
- node
- npm
- detox-cli (global install)
- watchman (used as part of building Android app)

2. Create a custom device in Simulator for `iPhone 8` and `iOS 14` and name it `iphone8-14` 

## React & React Native Compatibility

Our SDK is compatible with:
- `React Native 0.89.0` and above
- `React 19.3.0` and above
- `Android API level 24 (Android 7)` and above

## Getting Started

### Compiling the Access Checkout React Native SDK

1. Install the npm dependencies in the `access-checkout-react-native-sdk` project

```
cd access-checkout-react-native-sdk
npm install
```

2Re-run the script used to export the SDK's types

```
cd access-checkout-react-native-sdk
npm run prepare
```

## Developing in this repo

### Android
* Open up `demo-app/android/build.gradle` in android studio - this will show you the android module as 
well as the demo-app module

### IOS
* To work on the react native module, open `ios/AccessCheckoutReactNative.xcodeproj` in XCode.
* To run the demo application, open `demo-app/ios/AccessCheckoutReactNativeDemo.xcodeproj` in XCode.

### ReactNative
* To work on the ReactNative part of the demo application, open the root directory in IntelliJ and you can work in `demo-app/src`

### Running the SDK tests

```
cd access-checkout-react-native-sdk
npm run test
```
