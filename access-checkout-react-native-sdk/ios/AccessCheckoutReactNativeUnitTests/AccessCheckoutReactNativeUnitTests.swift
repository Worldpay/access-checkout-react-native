@testable import AccessCheckoutReactNative
import XCTest
import Mockingjay

class AccessCheckoutReactNativeUnitTests: XCTestCase {
    let accessCheckoutReactNative = AccessCheckoutReactNative()
    let stubServices = StubServices(baseUrl: "http://localhost")

    func testSupportedEventsAreOnly_AccessCheckoutValidationEvent() {
        XCTAssertEqual(["AccessCheckoutValidationEvent"], accessCheckoutReactNative.supportedEvents())
    }
    
    func testShouldSupportGeneratingACardSession() {
        let stubServices = StubServices(baseUrl: "http://localhost")
            .stubServicesRootDiscovery()
            .stubVerifiedTokensDiscovery()
            .stubVerifiedTokensSessionSuccess(session: "my-session")
        
        let expectationToFulfill = expectation(description: "Session retrieved")
        let dictionary:NSDictionary = ["baseUrl": stubServices.baseUrl,
                          "merchantId": "identity",
                          "panValue": "4444333322221111",
                          "expiryValue": "12/30",
                          "cvcValue": "123",
                          "sessionTypes": ["card"]
        ]
        
        accessCheckoutReactNative.generateSessions(config: dictionary) { (sessions) in
            let session = (sessions as![String:String?])["card"]
            XCTAssertEqual("my-session", session)
            expectationToFulfill.fulfill()
        } reject: { (a, b, c) in
            XCTFail("got an error back from stubs")
            expectationToFulfill.fulfill()
        }
        
        wait(for: [expectationToFulfill], timeout: 5)
    }
}
