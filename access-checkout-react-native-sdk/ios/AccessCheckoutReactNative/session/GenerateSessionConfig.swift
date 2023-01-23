import AccessCheckoutSDK

struct GenerateSessionConfig {
    let baseUrl: String
    let merchantId: String
    var panValue: String?
    var expiryDateValue: String?
    let cvcValue: String?
    let sessionTypes: Set<SessionType>
    var reactNativeSdkVersion: String?

    init(dictionary: NSDictionary) throws {
        self.baseUrl = dictionary["baseUrl"] as? String ?? ""
        self.merchantId = dictionary["merchantId"] as? String ?? ""
        self.cvcValue = dictionary["cvcValue"] as? String ?? ""

        if self.baseUrl == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingBaseUrl()
        }

        if self.merchantId == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingMerchantId()
        }

        if dictionary["panValue"] != nil {
            if let string = dictionary["panValue"] as? String, string != "" {
                self.panValue = string
            } else {
                throw AccessCheckoutRnIllegalArgumentError.missingPan()
            }
        }

        if dictionary["expiryDateValue"] != nil {
            if let string = dictionary["expiryDateValue"] as? String, string != "" {
                self.expiryDateValue = string
            } else {
                throw AccessCheckoutRnIllegalArgumentError.missingExpiryDate()
            }
        }

        let sessionTypes = dictionary["sessionTypes"] as? [AnyObject] ?? []

        if sessionTypes.count == 0 {
            throw AccessCheckoutRnIllegalArgumentError.missingSessionTypes()
        }

        if sessionTypes.count > 2 {
            throw AccessCheckoutRnIllegalArgumentError.tooManySessionTypes(
                numberFound: sessionTypes.count)
        }

        var set = Set<SessionType>()
        for sessionType in sessionTypes {
            if let type = sessionType as? String {
                switch type.lowercased() {
                case "card":
                    set.insert(SessionType.card)
                case "cvc":
                    set.insert(SessionType.cvc)
                default:
                    throw AccessCheckoutRnIllegalArgumentError.unrecognisedSessionType(type: type)
                }
            } else {
                throw AccessCheckoutRnIllegalArgumentError.sessionTypeIsNotString()
            }
        }
        self.sessionTypes = set

        // Pan and Expiry date are required when requesting a card session
        if self.sessionTypes.contains(SessionType.card) {
            if self.panValue == nil || self.panValue == "" {
                throw AccessCheckoutRnIllegalArgumentError.missingPan()
            } else if self.expiryDateValue == nil || self.expiryDateValue == "" {
                throw AccessCheckoutRnIllegalArgumentError.missingExpiryDate()
            }
        }
        // Cvc is always required independently on the type of session generated
        if self.cvcValue == nil || self.cvcValue == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingCvc()
        }

        if dictionary["reactNativeSdkVersion"] == nil {
            throw AccessCheckoutRnIllegalArgumentError.missingReactNativeSdkVersion()
        } else {
            if let string = dictionary["reactNativeSdkVersion"] as? String, string != "" {
                self.reactNativeSdkVersion = string
            } else {
                throw AccessCheckoutRnIllegalArgumentError.missingReactNativeSdkVersion()
            }
        }
    }
}
