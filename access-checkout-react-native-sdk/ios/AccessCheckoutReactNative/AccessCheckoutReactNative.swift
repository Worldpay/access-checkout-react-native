import AccessCheckoutSDK
import React

@objc(AccessCheckoutReactNative)
class AccessCheckoutReactNative: RCTEventEmitter {
    private let wpSdkHeaderFormat = "access-checkout-react-native/%@"
    private let cardValidationEventName = "AccessCheckoutCardValidationEvent"
    private let cvcOnlyValidationEventName = "AccessCheckoutCvcOnlyValidationEvent"

    private var accessCheckoutClient: AccessCheckoutClient?
    private let reactNativeViewLocator: ReactNativeViewLocator

    override init() {
        self.reactNativeViewLocator = ReactNativeViewLocator()
        super.init()
    }

    init(_ reactNativeViewLocator: ReactNativeViewLocator) {
        self.reactNativeViewLocator = reactNativeViewLocator
        super.init()
    }

    @objc(generateSessions:withResolver:withRejecter:)
    func generateSessions(
        config: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock)
    {
        do {
            let cfg = try GenerateSessionConfig(dictionary: config)

            if accessCheckoutClient == nil {
                accessCheckoutClient = try! AccessCheckoutClientBuilder()
                    .accessBaseUrl(cfg.baseUrl)
                    .merchantId(cfg.merchantId)
                    .build()
            }

            let cardDetails: CardDetails

            if isCvcSessionOnly(sessionTypes: cfg.sessionTypes) {
                cardDetails = try CardDetailsBuilder()
                    .cvc(cfg.cvcValue!)
                    .build()
            } else {
                cardDetails = try CardDetailsBuilder()
                    .pan(cfg.panValue!)
                    .expiryDate(cfg.expiryDateValue!)
                    .cvc(cfg.cvcValue!)
                    .build()
            }

            let wpSdkHeaderValue = String(format: wpSdkHeaderFormat, cfg.reactNativeSdkVersion!)
            try! WpSdkHeader.overrideValue(with: wpSdkHeaderValue)

            try accessCheckoutClient!.generateSessions(
                cardDetails: cardDetails, sessionTypes: cfg.sessionTypes)
            {
                result in
                DispatchQueue.main.async {
                    switch result {
                    case .success(let sessions):
                        resolve([
                            "card": sessions[SessionType.card],
                            "cvc": sessions[SessionType.cvc],
                        ])
                    case .failure(let error):
                        reject("", error.message, error)
                    }
                }
            }
        } catch let error as NSError {
            reject("", (error as! AccessCheckoutRnIllegalArgumentError).localizedDescription, error)
        }
    }

    @objc(initialiseCardValidation:withResolver:withRejecter:)
    func initialiseCardValidation(
        config: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock)
    {
        DispatchQueue.main.async {
            do {
                let config = try CardValidationConfigRN(dictionary: config)
                let panInput = self.reactNativeViewLocator.locateUITextField(id: config.panId)
                let expiryInput = self.reactNativeViewLocator.locateUITextField(
                    id: config.expiryDateId)
                let cvcInput = self.reactNativeViewLocator.locateUITextField(id: config.cvcId)

                if panInput == nil {
                    let error = AccessCheckoutRnIllegalArgumentError.panTextFieldNotFound(
                        panNativeId: config.panId)
                    reject("", error.localizedDescription, error)
                    return
                } else if expiryInput == nil {
                    let error = AccessCheckoutRnIllegalArgumentError.expiryDateTextFieldNotFound(
                        expiryDateNativeId: config.expiryDateId)
                    reject("", error.localizedDescription, error)
                    return
                } else if cvcInput == nil {
                    let error = AccessCheckoutRnIllegalArgumentError.cvcTextFieldNotFound(
                        cvcNativeId: config.cvcId)
                    reject("", error.localizedDescription, error)
                    return
                }

                let validationDelegate = CardValidationDelegateRN(
                    eventEmitter: self, eventName: self.cardValidationEventName)

                var builder = CardValidationConfig.builder()
                    .pan(panInput!)
                    .expiryDate(expiryInput!)
                    .cvc(cvcInput!)
                    .accessBaseUrl(config.baseUrl)
                    .validationDelegate(validationDelegate)
                    .acceptedCardBrands(config.acceptedCardBrands)

                if config.enablePanFormatting {
                    builder = builder.enablePanFormatting()
                }

                let validationConfig = try! builder.build()

                AccessCheckoutValidationInitialiser().initialise(validationConfig)
                resolve(true)
            } catch {
                reject("", "invalid validation config found", error)
            }
        }
    }

    @objc(initialiseCvcOnlyValidation:withResolver:withRejecter:)
    func initialiseCvcOnlyValidation(
        config: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock)
    {
        DispatchQueue.main.async {
            do {
                let config = try CvcOnlyValidationConfigRN(dictionary: config)
                let cvcInput = self.reactNativeViewLocator.locateUITextField(id: config.cvcId)

                if cvcInput == nil {
                    let error = AccessCheckoutRnIllegalArgumentError.cvcTextFieldNotFound(
                        cvcNativeId: config.cvcId)
                    reject("", error.localizedDescription, error)
                    return
                }

                let validationDelegate = CvcOnlyValidationDelegateRN(
                    eventEmitter: self, eventName: self.cvcOnlyValidationEventName)

                let validationConfig = try! CvcOnlyValidationConfig.builder()
                    .cvc(cvcInput!)
                    .validationDelegate(validationDelegate)
                    .build()

                AccessCheckoutValidationInitialiser().initialise(validationConfig)
                resolve(true)
            } catch {
                reject("", "invalid validation config found", error)
            }
        }
    }

    private func isCvcSessionOnly(sessionTypes: Set<SessionType>) -> Bool {
        return sessionTypes.count == 1 && sessionTypes.first == SessionType.cvc
    }

    override func supportedEvents() -> [String]! {
        return [cardValidationEventName, cvcOnlyValidationEventName]
    }

    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
