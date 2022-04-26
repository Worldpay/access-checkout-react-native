import AccessCheckoutSDK

struct GenerateSessionConfig {
    let baseUrl: String
    let merchantId: String
    var panValue: String? = nil
    var expiryDateValue: String? = nil
    let cvcValue: String?
    let sessionTypes: Set<SessionType>
    
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
        
        if self.cvcValue == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingCvc()
        }
        
        let sessionTypes = dictionary["sessionTypes"] as? [AnyObject] ?? []
        
        if sessionTypes.count == 0 {
            throw AccessCheckoutRnIllegalArgumentError.missingSessionTypes()
        }
        
        if sessionTypes.count > 2 {
            throw AccessCheckoutRnIllegalArgumentError.tooManySessionTypes(numberFound: sessionTypes.count)
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
    }
}
