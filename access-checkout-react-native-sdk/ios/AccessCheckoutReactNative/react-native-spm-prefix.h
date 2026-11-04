// Mirrors CocoaPods' default prefix header so the ObjC bridging shims compile
// under Swift Package Manager (which has no prefix-header mechanism). RN's
// `spm scaffold` auto-generates this for scaffolded libraries; because this SDK
// ships its own (self-managed) Package.swift, we commit the prefix header here
// and reference it from the ObjC target via `-include react-native-spm-prefix.h`
// + `headerSearchPath(".")`.
#ifdef __OBJC__
#import <Foundation/Foundation.h>
#if __has_include(<UIKit/UIKit.h>)
#import <UIKit/UIKit.h>
#endif
#endif
