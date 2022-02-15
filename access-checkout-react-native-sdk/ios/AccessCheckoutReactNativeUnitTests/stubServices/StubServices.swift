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
    private let cardConfigurationPath = "/access-checkout/cardTypes.json"
    
    func stubServicesRootDiscovery() -> StubServices {
        stub(http(.get, uri: baseUrl), successfulDiscoveryResponse())
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
        stub(http(.get, uri: "\(baseUrl)\(cardConfigurationPath)"), cardConfigurationResponse())
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
    

    private func cardConfigurationResponse() -> (URLRequest) -> Response {
        return jsonData(toData("""
        [{
            "name": "visa",
            "pattern": "^4\\\\d*$",
            "panLengths": [13,16,18,19],
            "cvvLength": 3,
            "images": [
                {
                    "type": "image/png",
                    "url": "http://localhost/visa.png"
                },
                {
                    "type": "image/svg+xml",
                    "url": "http://localhost/visa.svg"
                }
            ]
        }]
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
