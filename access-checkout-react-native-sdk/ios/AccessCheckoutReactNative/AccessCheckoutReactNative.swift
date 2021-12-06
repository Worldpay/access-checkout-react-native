import AccessCheckoutSDK
import React

@objc(AccessCheckoutReactNative)
class AccessCheckoutReactNative: RCTEventEmitter {
    private var accessCheckoutClient: AccessCheckoutClient?

    @objc(generateSessions:withResolver:withRejecter:)
    func generateSessions(config: NSDictionary,
                          resolve: @escaping RCTPromiseResolveBlock,
                          reject: @escaping RCTPromiseRejectBlock) {
        do {
            let cfg = try GenerateSessionConfig(dictionary: config)

            if accessCheckoutClient == nil {
                accessCheckoutClient = try! AccessCheckoutClientBuilder()
                    .accessBaseUrl(cfg.baseUrl)
                    .merchantId(cfg.merchantId)
                    .build()
            }

            let cardDetails = try CardDetailsBuilder()
                .pan(cfg.panValue)
                .expiryDate(cfg.expiryValue)
                .cvc(cfg.cvcValue)
                .build()

            try accessCheckoutClient!.generateSessions(cardDetails: cardDetails, sessionTypes: cfg.sessionTypes) {
                result in DispatchQueue.main.async {
                    switch result {
                    case .success(let sessions):
                        resolve([
                            "card": sessions[SessionType.card],
                            "cvc": sessions[SessionType.cvc]
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

    @objc(initialiseValidation:withResolver:withRejecter:)
    func initialiseValidation(config: NSDictionary,
                              resolve: @escaping RCTPromiseResolveBlock,
                              reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            do {
                let cfg = try ValidationConfig(dictionary: config)
                let controller = RCTPresentedViewController()
                let panInput = self.searchForView(subViews: controller?.view!.subviews, nativeId: cfg.panId)
                let expiryInput = self.searchForView(subViews: controller?.view!.subviews, nativeId: cfg.expiryId)
                let cvcInput = self.searchForView(subViews: controller?.view!.subviews, nativeId: cfg.cvcId)

                if panInput != nil, expiryInput != nil, cvcInput != nil {
                    var builder = CardValidationConfig.builder()
                        .pan(panInput!)
                        .expiryDate(expiryInput!)
                        .cvc(cvcInput!)
                        .accessBaseUrl(cfg.baseUrl)
                        .validationDelegate(AccessCheckoutCardValidationDelegateRN(eventEmitter: self, eventName: "AccessCheckoutValidationEvent") as AccessCheckoutCardValidationDelegate)

                    if cfg.enablePanFormatting {
                        builder = builder.enablePanFormatting()
                    }

                    let validationConfig = try! builder.build()

                    AccessCheckoutValidationInitialiser().initialise(validationConfig)
                    resolve(true)
                }
            } catch {
                reject("", "invalid generate session config found", error)
            }
        }
    }

    func searchForView(subViews: [UIView]?, nativeId: String) -> UITextField? {
        if subViews == nil {
            return nil
        }

        for subView in subViews! {
            if subView.nativeID == nil {
                let v = searchForView(subViews: subView.subviews, nativeId: nativeId)
                if v != nil {
                    return v
                }
            } else if subView.nativeID! == nativeId {
                let inputView = (subView as? RCTSinglelineTextInputView)?.backedTextInputView
                return inputView as! UITextField
            }
        }

        return nil
    }

    override func supportedEvents() -> [String]! {
        return ["AccessCheckoutValidationEvent"]
    }
}
