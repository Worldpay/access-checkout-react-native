#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(AccessCheckoutTextInputManager, RCTViewManager)
//Externalises properties
RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
@end
