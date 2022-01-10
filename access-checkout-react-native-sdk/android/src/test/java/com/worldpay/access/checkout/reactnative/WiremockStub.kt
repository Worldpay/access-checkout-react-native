package com.worldpay.access.checkout.reactnative

import com.github.tomakehurst.wiremock.client.WireMock

class WiremockStubUnitTest {
    fun stubRootSuccess() {
        WireMock.stubFor(
            WireMock.get("/")
                .willReturn(
                    WireMock.aResponse()
                        .withStatus(200)
                        .withBody(
                            """
                                {
                                    "_links": {
                                        "service:payments": {
                                        "href": "http://localhost:8080/payments"
                                        },
                                        "service:sessions": {
                                        "href": "http://localhost:8080/sessions"
                                        },
                                        "service:verifiedTokens": {
                                        "href": "http://localhost:8080/verifiedTokens"
                                        },
                                        "curies": [
                                            {
                                            "href": "http://localhost:8080/rels/payments/{rel}",
                                            "name": "payments",
                                            "templated": true
                                            }
                                        ]
                                    }
                                }
                            """
                        )
                )
        )
    }

    fun stubVerifiedTokensRootSuccess() {
        WireMock.stubFor(
            WireMock.get("/verifiedTokens")
                .willReturn(
                    WireMock.aResponse()
                        .withStatus(200)
                        .withBody(
                            """
                                {
                                    "_links": {
                                        "resourceTree": {
                                            "href": "http://localhost:8080/rels/verifiedTokens/resourceTree.json"
                                        },
                                            "verifiedTokens:sessions": {
                                            "href": "http://localhost:8080/verifiedTokens/sessions"
                                        },
                                            "verifiedTokens:cardOnFile": {
                                            "href": "http://localhost:8080/verifiedTokens/cardOnFile"
                                        },
                                        "curies": [
                                            {
                                                "href": "http://localhost:8080/rels/verifiedTokens/{rel}.json",
                                                "name": "verifiedTokens",
                                                "templated": true
                                            }
                                        ]
                                    }
                                }
                            """
                        )
                )
        )
    }

    fun stubVerifiedTokensSessionsSuccess(session:String) {
        WireMock.stubFor(
            WireMock.post("/verifiedTokens/sessions")
                .willReturn(
                    WireMock.aResponse()
                        .withStatus(201)
                        .withBody(
                            """
                                {
                                "_links": {
                                  "curies": [
                                    {
                                      "templated": true,
                                      "name": "verifiedTokens",
                                      "href": "http://localhost:8080/rels/verifiedTokens/{rel}.json"
                                    }
                                  ],
                                  "verifiedTokens:session": {
                                    "href": "http://localhost:8080/verifiedTokens/sessions/${session}"
                                  }
                                }x
                            """
                        )
                )
        )
    }

    fun stubSessionsRootSuccess() {
        WireMock.stubFor(
            WireMock.get("/sessions")
                .willReturn(
                    WireMock.aResponse()
                        .withStatus(200)
                        .withBody(
                            """
                                {
                                    "_links": {
                                        "sessions:paymentsCvc": {
                                            "href": "http://localhost:8080/sessions/payments/cvc"
                                        },
                                        "resourceTree": {
                                            "href": "http://localhost:8080/rels/sessions/resourceTree.json"
                                        },
                                        "curies": [
                                            {
                                                "href": "http://localhost:8080/rels/sessions/{rel}.json",
                                                "name": "sessions",
                                                "templated": true
                                            }
                                        ]
                                    }
                                }
                            """
                        )
                )
        )
    }
}