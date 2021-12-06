import AccessCheckoutSDK

public struct ValidationConfig {
    let baseUrl: String
    let panId: String
    let expiryId: String
    let cvcId: String
    var enablePanFormatting: Bool = false
    var acceptedCardBrands: [String] = []
    
    init(dictionary: NSDictionary) throws {
        self.baseUrl = dictionary["baseUrl"] as? String ?? ""
        self.panId = dictionary["panId"] as? String ?? ""
        self.expiryId = dictionary["expiryId"] as? String ?? ""
        self.cvcId = dictionary["cvcId"] as? String ?? ""
        self.enablePanFormatting = dictionary["enablePanFormatting"] as? Bool ?? false
        self.acceptedCardBrands = dictionary["acceptedCardBrands"] as? [String] ?? []
        
        if self.baseUrl == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingBaseUrl()
        }
        
        if self.panId == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingPanId()
        }
        
        if self.expiryId == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingExpiryId()
        }
        
        if self.cvcId == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingCvcId()
        }
    }
}
