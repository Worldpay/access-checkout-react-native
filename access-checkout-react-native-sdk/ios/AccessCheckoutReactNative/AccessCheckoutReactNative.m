#import "AccessCheckoutReactNativeModule-Bridging-Header.h"

// externalises the AccessCheckoutReactNative module - this must be the same as the one in android module getName() method
@interface RCT_EXTERN_MODULE(AccessCheckoutReactNative, NSObject)

// externalises the generateSessions method signature that is defined in AccessCheckoutReactNative.swift
RCT_EXTERN_METHOD(generateSessions:(NSDictionary *) config
                  withResolver:(RCTPromiseResolveBlock *) resolve
                  withRejecter:(RCTPromiseRejectBlock *) reject)

// externalises the initialiseValidation method signature that is defined in AccessCheckoutReactNative.swift
RCT_EXTERN_METHOD(initialiseValidation:(NSDictionary *) config
                  withResolver:(RCTPromiseResolveBlock *) resolve
                  withRejecter:(RCTPromiseRejectBlock *) reject)

@end
