#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(AccessCheckoutTextInputManager, RCTViewManager)

//Externalises properties using a remap in case of name changes
//RCT_REMAP_VIEW_PROPERTY(RN property name, ios property name, type)

RCT_REMAP_VIEW_PROPERTY(placeholder, placeholder, NSString)
RCT_REMAP_VIEW_PROPERTY(editable, enabled, BOOL)

// The following properties use RCTConvert behind the scenes to convert to appropriate types
RCT_REMAP_VIEW_PROPERTY(textColor, textColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(font, font, UIFont)
//RCT_REMAP_VIEW_PROPERTY(keyboardType, keyboardType, UIKeyboardType)

@end
