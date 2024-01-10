#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(AccessCheckoutTextInputManager, RCTViewManager)

//Externalises properties using a remap in case of name changes
//RCT_REMAP_VIEW_PROPERTY(RN property name, ios property name, type)

RCT_REMAP_VIEW_PROPERTY(placeholder, placeholder, NSString)
RCT_REMAP_VIEW_PROPERTY(editable, enabled, BOOL)

RCT_REMAP_VIEW_PROPERTY(textColor, textColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(font, font, UIFont)

@end
