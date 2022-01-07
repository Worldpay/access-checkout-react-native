# Access Checkout React Native SDK

## Prerequisites

1. Install the following tools
- node
- npm
- detox-cli (global install)
- pod (Cocoapods)
- watchman (used as part of building Android app)

2. Add to your bash profile file (i.e. .bash_profile, .zprofile, etc ..) an export command to set the `ACCESS_CHECKOUT_IOS_PATH` environment variable with the path of your local copy of the `access-checkout-ios` repository

```
export ACCESS_CHECKOUT_IOS_PATH=/Users/e5610203/DEV/access-checkout-ios
```

3. Create a custom device in Simulator for `iPhone 8` and `iOS 14` and name it `iphone8-14` 

## Getting Started

### Compiling the Access Checkout React Native SDK

1. Install the npm dependencies in the `access-checkout-react-native-sdk` project

```
cd access-checkout-react-native-sdk
npm install
```

2. Install the CocoaPods dependencies in the `access-checkout-react-native-sdk` project's iOS bridge

```
cd access-checkout-react-native-sdk/ios
pod install
```

3. Re-run the script used to export the SDK's types

```
cd access-checkout-react-native-sdk
npm run prepare
```

### Compiling the demo application

1. Install the npm dependencies in the demo-app  folder

```
cd demo-app/
npm install
```

2. Install the CocoaPods dependencies in the demo-app's ios folder

```
cd demo-app/ios
pod install
```

3. Compile the application

```
cd demo-app/
npm run typescript
```

## Running the Demo Application

First, start the metro server

```
cd demo-app/
npm run start
```

### Running the application for iOS

```
cd demo-app/
npm run ios
```

### Running the application for Android

```
cd demo-app/
npm run android
```

## Developing in this repo

### Android
* Open up `demo-app/android/build.gradle` in android studio - this will show you the android module as 
well as the demo-app module

### IOS
* To work on the react native module, open `ios/AccessCheckoutReactNative.xcworkspace` in XCode.
* To run the demo application, open `demo-app/ios/AccessCheckoutReactNativeDemo.xcworkspace` in XCode.
   * Use this application to debug the code, you can find the module code in `Pods/Development Pods/AccessCheckoutSDK-React`

### ReactNative
* To work on the ReactNative part of the demo application, open the root directory in Intellij and you can work in `demo-app/src`

### Running the SDK tests

```
cd access-checkout-react-native-sdk
npm run test
```
