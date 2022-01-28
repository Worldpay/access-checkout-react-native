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
    
    private func toData(_ stringData: String) -> Data {
        return stringData.data(using: .utf8)!
    }
}
