import AccessCheckoutSDK

public struct AccessCheckoutRnIllegalArgumentError: Error, Equatable {
    public let message: String
    
    private init(message: String) {
        self.message = message
    }
    
    public var localizedDescription: String {
        return self.message
    }
    
    static func missingBaseUrl() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected base url to be provided but was not")
    }
    
    static func missingCvc() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected cvc to be provided but was not")
    }
    
    static func missingExpiryDate() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected expiry date to be provided but was not")
    }
    
    static func missingMerchantId() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected merchant ID to be provided but was not")
    }
    
    static func missingPan() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected pan to be provided but was not")
    }
    
    static func missingPanId() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected pan id to be provided but was not")
    }
    
    static func missingExpiryId() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected expiry id to be provided but was not")
    }
    
    static func missingCvcId() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected cvc id to be provided but was not")
    }
    
    static func missingSessionTypes() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected session types to be provided but was not")
    }
    
    static func tooManySessionTypes(numberFound: Int) -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected maximum of 2 session types to be provided but found \(numberFound)")
    }
    
    static func sessionTypeIsNotString() -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Expected session type value to be a string but was not")
    }
    
    static func unrecognisedSessionType(type: String) -> AccessCheckoutRnIllegalArgumentError {
        return AccessCheckoutRnIllegalArgumentError(message: "Unrecgonised session type found \(type), only CARD or CVC is accepted")
    }
}
