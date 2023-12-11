import Mockingjay
import XCTest

@testable import AccessCheckoutReactNative

final class StubServices: XCTest {
    let baseUrl: String

    init(baseUrl: String) {
        self.baseUrl = baseUrl
    }

    private let sessionsServicePath = "/sessions"
    private let sessionsServiceCardSessionPath = "/sessions/card"
    private let sessionsServicePaymentsCvcSessionPath = "/sessions/paymentsCvc"
    private let cardConfigurationPath = "/access-checkout/cardTypes.json"

    func stubServicesRootDiscovery() -> StubServices {
        stub(http(.get, uri: baseUrl), successfulRootDiscoveryResponse())
        return self
    }

    func stubSessionsDiscovery() -> StubServices {
        stub(http(.get, uri: "\(baseUrl)\(sessionsServicePath)"), successfulSessionsDiscoveryResponse())
        return self
    }

    func stubSessionsCardSessionSuccess(session: String) -> StubServices {
        stub(
            http(.post, uri: "\(baseUrl)\(sessionsServiceCardSessionPath)"),
            successfulSessionsSessionResponse(session: session))
        return self
    }

    func stubSessionsCardSessionFailure(errorName: String, errorMessage: String) -> StubServices {
        stub(
            http(.post, uri: "\(baseUrl)\(sessionsServiceCardSessionPath)"),
            failedResponse(errorName: errorName, errorMessage: errorMessage))
        return self
    }

    func stubSessionsCvcSessionSuccess(session: String) -> StubServices {
        stub(
            http(.post, uri: "\(baseUrl)\(sessionsServicePaymentsCvcSessionPath)"),
            successfulSessionsSessionResponse(session: session))
        return self
    }

    func stubCardConfiguration() -> StubServices {
        stub(http(.get, uri: "\(baseUrl)\(cardConfigurationPath)"), cardConfigurationResponse())
        return self
    }
    
    private func successfulRootDiscoveryResponse() -> (URLRequest) -> Response {
        return jsonData(
            toData(
                """
                {
                    "_links": {
                        "service:sessions": {
                            "href": "\(baseUrl)\(sessionsServicePath)"
                        }
                    }
                }
                """), status: 200)
    }
    
    private func successfulSessionsDiscoveryResponse() -> (URLRequest) -> Response {
        return jsonData(
            toData(
                """
                {
                    "_links": {
                        "sessions:paymentsCvc": {
                            "href": "\(baseUrl)\(sessionsServicePaymentsCvcSessionPath)"
                        },
                        "sessions:card": {
                            "href": "\(baseUrl)\(sessionsServiceCardSessionPath)"
                        }
                    }
                }
                """), status: 200)
    }

    private func cardConfigurationResponse() -> (URLRequest) -> Response {
        return jsonData(
            toData(
                """
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

    private func successfulSessionsSessionResponse(session: String) -> (URLRequest) -> Response {
        return jsonData(
            toData(
                """
                {
                    "_links": {
                        "sessions:session": {
                            "href": "\(session)"
                        }
                    }
                }
                """), status: 201)
    }

    private func failedResponse(errorName: String, errorMessage: String) -> (
        URLRequest
    ) -> Response {
        return jsonData(
            toData(
                """
                {
                    "errorName": "\(errorName)",
                    "message": "\(errorMessage)"
                }
                """), status: 400)
    }

    private func toData(_ stringData: String) -> Data {
        return stringData.data(using: .utf8)!
    }

}
