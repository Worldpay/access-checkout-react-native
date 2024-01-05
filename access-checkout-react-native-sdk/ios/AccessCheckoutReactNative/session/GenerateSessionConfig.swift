import AccessCheckoutSDK

struct GenerateSessionConfig {
    let baseUrl: String
    let merchantId: String
    var panId: String?
    var expiryDateId: String?
    let cvcId: String
    let sessionTypes: Set<SessionType>
    var reactNativeSdkVersion: String?

    init(dictionary: NSDictionary) throws {
        // Required Arguments
        self.baseUrl = dictionary["baseUrl"] as? String ?? ""
        self.merchantId = dictionary["merchantId"] as? String ?? ""
        self.cvcId = dictionary["cvcId"] as? String ?? ""

        guard !self.baseUrl.isEmpty else {
            throw AccessCheckoutRnIllegalArgumentError.missingBaseUrl()
        }
        guard !self.merchantId.isEmpty else {
            throw AccessCheckoutRnIllegalArgumentError.missingMerchantId()
        }

        // Cvc is always required independently on the type of session generated
        guard !self.cvcId.isEmpty else {
            throw AccessCheckoutRnIllegalArgumentError.missingCvc()
        }

        let sessionTypes = dictionary["sessionTypes"] as? [AnyObject] ?? []

        guard sessionTypes.count != 0 else {
            throw AccessCheckoutRnIllegalArgumentError.missingSessionTypes()
        }
        guard sessionTypes.count <= 2 else {
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
            if let string = dictionary["panId"] as? String, !string.isEmpty {
                self.panId = string
            } else {
                throw AccessCheckoutRnIllegalArgumentError.missingPan()
            }

            if let string = dictionary["expiryDateId"] as? String, !string.isEmpty {
                self.expiryDateId = string
            } else {
                throw AccessCheckoutRnIllegalArgumentError.missingExpiryDate()
            }
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
