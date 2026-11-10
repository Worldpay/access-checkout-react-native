// swift-tools-version: 6.0
// AUTO-SCAFFOLDED by react-native spm scaffold — safe to edit & commit via patch-package.
// AUTO-SCAFFOLDED-VERSION: 19
// Cache slot: 0.87.0/dual-flavor
// Edit the contents below if needed and re-run `npx patch-package <dep-name>`
// to persist across `npm install`. To regenerate from the podspec, remove
// this file (or just this marker) and re-run `npx react-native spm scaffold`.
//
// Package references are plain relative paths, computed when this file was
// scaffolded. They stay correct because the file is re-scaffolded per app
// and cache slot, and any node_modules relayout reinstalls this package
// (dropping the file) anyway.

import PackageDescription

let package = Package(
    name: "react-native-safe-area-context",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "react-native-safe-area-context", targets: ["ReactNativeSafeAreaContext"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
    ],
    targets: [
        .target(
            name: "ReactNativeSafeAreaContext",
            dependencies: [.product(name: "ReactHeaders", package: "ReactNative"), .product(name: "ReactNativeHeaders", package: "ReactNative"), .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"), .product(name: "ReactAppHeaders", package: "React-GeneratedCode")],
            path: ".",
            sources: [
                "common/cpp/react/renderer/components/safeareacontext/RNCSafeAreaViewComponentDescriptor.h",
                "common/cpp/react/renderer/components/safeareacontext/RNCSafeAreaViewShadowNode.cpp",
                "common/cpp/react/renderer/components/safeareacontext/RNCSafeAreaViewShadowNode.h",
                "common/cpp/react/renderer/components/safeareacontext/RNCSafeAreaViewState.cpp",
                "common/cpp/react/renderer/components/safeareacontext/RNCSafeAreaViewState.h",
                "ios/Fabric/RNCSafeAreaProviderComponentView.h",
                "ios/Fabric/RNCSafeAreaProviderComponentView.mm",
                "ios/Fabric/RNCSafeAreaViewComponentView.h",
                "ios/Fabric/RNCSafeAreaViewComponentView.mm",
                "ios/RNCOnInsetsChangeEvent.h",
                "ios/RNCOnInsetsChangeEvent.m",
                "ios/RNCSafeAreaContext.h",
                "ios/RNCSafeAreaContext.mm",
                "ios/RNCSafeAreaProvider.h",
                "ios/RNCSafeAreaProvider.m",
                "ios/RNCSafeAreaProviderManager.h",
                "ios/RNCSafeAreaProviderManager.m",
                "ios/RNCSafeAreaShadowView.h",
                "ios/RNCSafeAreaShadowView.m",
                "ios/RNCSafeAreaUtils.h",
                "ios/RNCSafeAreaUtils.m",
                "ios/RNCSafeAreaView.h",
                "ios/RNCSafeAreaView.m",
                "ios/RNCSafeAreaViewEdgeMode.h",
                "ios/RNCSafeAreaViewEdgeMode.m",
                "ios/RNCSafeAreaViewEdges.h",
                "ios/RNCSafeAreaViewEdges.m",
                "ios/RNCSafeAreaViewLocalData.h",
                "ios/RNCSafeAreaViewLocalData.m",
                "ios/RNCSafeAreaViewManager.h",
                "ios/RNCSafeAreaViewManager.m",
                "ios/RNCSafeAreaViewMode.h",
                "ios/RNCSafeAreaViewMode.m",
            ],
            publicHeadersPath: "ios",
            cSettings: [.headerSearchPath("common/cpp"), .headerSearchPath("common/cpp/react/renderer/components/safeareacontext"), .headerSearchPath("ios/Fabric"), .headerSearchPath("ios"), .headerSearchPath("."), .unsafeFlags(["-include", "react-native-spm-prefix.h"])],
            cxxSettings: [.headerSearchPath("common/cpp"), .headerSearchPath("common/cpp/react/renderer/components/safeareacontext"), .headerSearchPath("ios/Fabric"), .headerSearchPath("ios"), .headerSearchPath("."), .unsafeFlags(["-include", "react-native-spm-prefix.h"]), .define("DEBUG", .when(configuration: .debug)), .define("NDEBUG", .when(configuration: .release))],
            linkerSettings: [.linkedFramework("UIKit"), .linkedFramework("Foundation"), .linkedFramework("CoreGraphics")]
        ),
    ],
    cxxLanguageStandard: .cxx20
)
