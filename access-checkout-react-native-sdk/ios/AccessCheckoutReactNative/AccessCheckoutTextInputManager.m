#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <AccessCheckoutSDK/AccessCheckoutSDK-Swift.h>

@interface RCT_EXTERN_MODULE(AccessCheckoutTextInputManager, RCTViewManager)

//Externalises properties using a remap in case of name changes
//RCT_REMAP_VIEW_PROPERTY(RN property name, ios property name, type)

RCT_REMAP_VIEW_PROPERTY(placeholder, placeholder, NSString)
RCT_REMAP_VIEW_PROPERTY(editable, isEnabled, BOOL)

RCT_REMAP_VIEW_PROPERTY(color, textColor, UIColor)
RCT_REMAP_VIEW_PROPERTY(font, font, UIFont)

RCT_CUSTOM_VIEW_PROPERTY(placeholderTextColor, UIColor, AccessCheckoutUITextField)
{
    UIColor *uiColor = [RCTConvert UIColor:json];
    if (uiColor != nil) {
        view.attributedPlaceholder = [[NSAttributedString alloc] initWithString:view.placeholder attributes:@{NSForegroundColorAttributeName: uiColor}];
    }
}

@end
