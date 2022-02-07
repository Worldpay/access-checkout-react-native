@testable import AccessCheckoutReactNative
import XCTest
import Mockingjay

final class StubServices :XCTest {
    let baseUrl:String
    
    init (baseUrl:String) {
        self.baseUrl = baseUrl
    }
    
    private let verifiedTokensServicePath = "/verifiedTokens"
    private let verifiedTokensServiceSessionsPath = "/verifiedTokens/sessions"
    private let sessionsServicePath = "/sessions"
    private let sessionsServicePaymentsCvcSessionPath = "/sessions/paymentsCvc"
    private let cardConfigurationPath = "/cardConfiguration"
    private let cardTypesPath = "/access-checkout/cardTypes.json"
    
    //response
    
    func stubServicesRootDiscovery() -> StubServices {
        stub(http(.get, uri: baseUrl), successfulDiscoveryResponse())
        return self
    }
    
    //Mock a stub with endpoint - "\(baseUrl)\(cardTypePath)") /access-checkout/cardTypes.json
    //https://try.access.worldpay.com/access-checkout/cardTypes.json
    // http://localhost/access-checkout/cardTypes.json
    
    func stubCardTypes() -> StubServices {
        stub(http(.get, uri: "\(baseUrl)\(cardTypesPath)"), cardTypesResponse())
        return self
    }
        
    func stubVerifiedTokensDiscovery() -> StubServices {
        stub(http(.get, uri: "\(baseUrl)\(verifiedTokensServicePath)"), successfulDiscoveryResponse())
        return self
    }
    
    func stubVerifiedTokensSessionSuccess(session: String)-> StubServices {
        stub(http(.post, uri: "\(baseUrl)\(verifiedTokensServiceSessionsPath)"), successfulVerifiedTokensSessionResponse(session: session))
        return self
    }
    
    func stubSessionsDiscovery() -> StubServices {
        stub(http(.get, uri: "\(baseUrl)\(sessionsServicePath)"), successfulDiscoveryResponse())
        return self
    }
    
    func stubSessionsSessionSuccess(session: String) -> StubServices {
        stub(http(.post, uri: "\(baseUrl)\(sessionsServicePaymentsCvcSessionPath)"), successfulSessionsSession(session:session))
        return self
    }
    
    func stubCardConfiguration() -> StubServices {
        stub(http(.get, uri: "\(baseUrl)\(cardConfigurationPath)"), successfulDiscoveryResponse())
        return self
    }
    
    private func successfulDiscoveryResponse() -> (URLRequest) -> Response {
        return jsonData(toData("""
        {
            "_links": {
                "service:verifiedTokens": {
                    "href": "\(baseUrl)\(verifiedTokensServicePath)"
                },
                "verifiedTokens:sessions": {
                    "href": "\(baseUrl)\(verifiedTokensServiceSessionsPath)"
                },
                "service:sessions": {
                    "href": "\(baseUrl)\(sessionsServicePath)"
                },
                "sessions:paymentsCvc": {
                    "href": "\(baseUrl)\(sessionsServicePaymentsCvcSessionPath)"
                }
            }
        }
        """), status: 200)
    }
    

    private func cardTypesResponse() -> (URLRequest) -> Response {
        return jsonData(toData("""
    [
    {
      "name": "visa",
      "pattern": "^(?!^493698\\d*$)4\\d*$",
      "panLengths": [
        13,
        16,
        18,
        19
      ],
      "cvvLength": 3,
      "images": [
        {
          "type": "image/png",
          "url": "https://try.access.worldpay.com/access-checkout/assets/visa.png"
        },
        {
          "type": "image/svg+xml",
          "url": "https://try.access.worldpay.com/access-checkout/assets/visa.svg"
        }
      ]
    }
    ]
    """), status: 200)
    }
    
    private func successfulVerifiedTokensSessionResponse(session: String) -> (URLRequest) -> Response {
        return jsonData(toData("""
        {
            "_links": {
                "verifiedTokens:session": {
                    "href": "\(session)"
                }
            }
        }
        """), status: 201)
    }
    
    private func successfulSessionsSession(session: String) -> (URLRequest) -> Response {
            return jsonData(toData("""
            {
                "_links": {
                    "sessions:session": {
                        "href": "\(session)"
                    }
                }
            }
            """), status: 201)
        }
    
    
    
    private func toData(_ stringData: String) -> Data {
        return stringData.data(using: .utf8)!
    }
    
}
