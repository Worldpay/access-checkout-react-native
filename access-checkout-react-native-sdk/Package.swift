// swift-tools-version: 6.0
// Package.swift for @worldpay/access-worldpay-checkout-react-native-sdk
//
// This ships Swift Package Manager (SPM) support ALONGSIDE the existing
// CocoaPods podspec (access-checkout-react-native-sdk.podspec). React Native's
// SPM autolinking treats a library that ships its own Package.swift as
// "self-managed" and uses this file as-is (instead of auto-generating one from
// the podspec — which it cannot do for a mixed Swift + Objective-C module).
//
// ─────────────────────────────────────────────────────────────────────────────
// Two-target split (SPM cannot compile Swift + ObjC in a single target):
//
//   • AccessWorldpayCheckoutReactNativeSdk        — the Swift sources. They
//     `import React`, `import AccessCheckoutSDK`, and subclass RCTEventEmitter /
//     RCTViewManager.
//   • AccessWorldpayCheckoutReactNativeSdkObjC    — the ObjC bridging shims
//     (RCT_EXTERN_MODULE / RCT_EXTERN_METHOD / RCT_REMAP_VIEW_PROPERTY) that
//     register the Swift classes with the RN bridge.
//
// There is NO circular dependency between the two: the .m shims register the
// Swift classes with the ObjC runtime at load time and do NOT `#import` the
// generated `-Swift.h`. So: Swift target → React + AccessCheckoutSDK; ObjC
// target → React; neither depends on the other at compile time. Both are shipped
// in a single library product.
//
// ⚠️ VERIFY-IN-XCODE (first integration):
//   1. The ObjC shim target must be FORCE-LOADED (-ObjC / -force_load) in the
//      consuming app so the RCT_EXTERN_MODULE registrations actually run —
//      otherwise the JS side can't find `AccessCheckoutReactNative` /
//      `AccessCheckoutTextInputManager`. RN's SPM autolinking normally adds
//      `-ObjC`; confirm it does for this package.
//   2. The React package relative paths below point at the per-app generated
//      React xcframeworks / codegen. They assume this package is consumed as a
//      REAL install (pnpm `injected` dependency / npm install), NOT a workspace
//      symlink. Adjust the number of `../` if your app's layout differs.
//   3. `import React` (Swift) resolves against the React module exposed by the
//      RN SPM React package; confirm the product name on your RN version.
// ─────────────────────────────────────────────────────────────────────────────

import PackageDescription

// Sources live together in ios/AccessCheckoutReactNative. We carve two targets
// out of that one directory with explicit, disjoint `sources` lists.
let swiftSources = [
    "AccessCheckoutReactNative.swift",
    "AccessCheckoutRnIllegalArgumentError.swift",
    "AccessCheckoutTextInputManager.swift",
    "AccessCheckoutUITextFieldExtension.swift",
    "session/GenerateSessionConfig.swift",
    "validation/CardValidationConfigRN.swift",
    "validation/CardValidationDelegateRN.swift",
    "validation/CvcOnlyValidationConfigRN.swift",
    "validation/CvcOnlyValidationDelegateRN.swift",
    "validation/ReactNativeViewLocator.swift",
]

let objcSources = [
    "AccessCheckoutReactNative.m",
    "AccessCheckoutTextInputManager.m",
]

let package = Package(
    name: "AccessWorldpayCheckoutReactNativeSdk",
    platforms: [.iOS(.v13)],
    products: [
        // Both targets are shipped together as one library.
        .library(
            name: "AccessWorldpayCheckoutReactNativeSdk",
            targets: [
                "AccessWorldpayCheckoutReactNativeSdk",
                "AccessWorldpayCheckoutReactNativeSdkObjC",
            ]
        ),
    ],
    dependencies: [
        // Per-app React, provided by RN's SPM autolinking (generated xcframeworks
        // + codegen). RN autolinking consumes this package via a synthesized
        // symlink at ios/build/generated/autolinking/libs/<Name>, and SPM
        // resolves these relative paths LEXICALLY from that libs/<Name> location
        // (it does not follow the symlink into node_modules). That location has a
        // fixed depth regardless of npm scoping, so these match the paths a
        // scaffolded (unscoped) library uses:
        //   libs/<Name>/../../../../xcframeworks -> ios/build/xcframeworks
        //   libs/<Name>/../../../ios            -> ios/build/generated/ios
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
        // Native Worldpay Access Checkout iOS SDK — consumed via SPM instead of
        // the CocoaPods `s.dependency "AccessCheckoutSDK", "~> 4.1"`.
        .package(
            url: "https://github.com/Worldpay/access-checkout-ios.git",
            .upToNextMajor(from: "4.1.0")
        ),
    ],
    targets: [
        // ── Swift target ────────────────────────────────────────────────────
        .target(
            name: "AccessWorldpayCheckoutReactNativeSdk",
            dependencies: [
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "ReactNativeHeaders", package: "ReactNative"),
                .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"),
                .product(name: "ReactAppHeaders", package: "React-GeneratedCode"),
                .product(name: "AccessCheckoutSDK", package: "access-checkout-ios"),
            ],
            path: "ios/AccessCheckoutReactNative",
            exclude: objcSources + [
                "AccessCheckoutReactNativeModule-Bridging-Header.h",
                "react-native-spm-prefix.h",
            ],
            sources: swiftSources,
            resources: [
                // Privacy manifest (ported from the podspec `resource_bundles`).
                .copy("PrivacyInfo.xcprivacy"),
            ],
            swiftSettings: [
                .unsafeFlags(["-enable-upcoming-feature", "BareSlashRegexLiterals"], .when(configuration: .debug)),
            ]
        ),
        // ── Objective-C bridging shim target ───────────────────────────────
        .target(
            name: "AccessWorldpayCheckoutReactNativeSdkObjC",
            dependencies: [
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "ReactNativeHeaders", package: "ReactNative"),
                .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"),
                .product(name: "ReactAppHeaders", package: "React-GeneratedCode"),
            ],
            path: "ios/AccessCheckoutReactNative",
            exclude: swiftSources + ["PrivacyInfo.xcprivacy"],
            sources: objcSources,
            // The bridging header (imported by AccessCheckoutReactNative.m) is the
            // single public header in this directory.
            publicHeadersPath: ".",
            cSettings: [
                // RN SPM autolinking generates a prefix header that pulls in the
                // React umbrella/defines the RCT_EXTERN_* macros rely on.
                .headerSearchPath("."),
                .unsafeFlags(["-include", "react-native-spm-prefix.h"]),
            ]
        ),
    ],
    swiftLanguageModes: [.v5],
    cxxLanguageStandard: .cxx20
)
