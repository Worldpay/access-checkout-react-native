import Foundation

struct CvcOnlyValidationConfigRN {
    private(set) var cvcId: String = ""

    init(dictionary: NSDictionary) throws {
        self.cvcId = dictionary["cvcId"] as? String ?? ""

        if self.cvcId == "" {
            throw AccessCheckoutRnIllegalArgumentError.missingCvcId()
        }
    }
}
