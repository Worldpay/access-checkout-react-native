package com.worldpay.access.checkout.reactnative

import com.github.tomakehurst.wiremock.client.WireMock

class WiremockStub constructor() {

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
                                        "href": "https://localhost:8443/payments"
                                        },
                                        "service:sessions": {
                                        "href": "https://localhost:8443/sessions"
                                        },
                                        "service:verifiedTokens": {
                                        "href": "https://localhost:8443/verifiedTokens"
                                        },
                                        "curies": [
                                            {
                                            "href": "https://localhost:8443/rels/payments/{rel}",
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
                                            "href": "https://localhost:8443/rels/verifiedTokens/resourceTree.json"
                                        },
                                            "verifiedTokens:sessions": {
                                            "href": "https://localhost:8443/verifiedTokens/sessions"
                                        },
                                            "verifiedTokens:cardOnFile": {
                                            "href": "https://localhost:8443/verifiedTokens/cardOnFile"
                                        },
                                        "curies": [
                                            {
                                                "href": "https://localhost:8443/rels/verifiedTokens/{rel}.json",
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

    fun stubVerifiedTokensSessionsSuccess(session: String) {
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
                                      "href": "https://localhost:8443/rels/verifiedTokens/{rel}.json"
                                    }
                                  ],
                                  "verifiedTokens:session": {
                                    "href": "https://localhost:8443/verifiedTokens/sessions/${session}"
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
                                            "href": "https://localhost:8443/sessions/payments/cvc"
                                        },
                                        "resourceTree": {
                                            "href": "https://localhost:8443/rels/sessions/resourceTree.json"
                                        },
                                        "curies": [
                                            {
                                                "href": "https://localhost:8443/rels/sessions/{rel}.json",
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