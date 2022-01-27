package com.worldpay.access.checkout.reactnative.services

import com.github.tomakehurst.wiremock.client.WireMock.*

class VerifiedTokensStub {
    companion object {
        fun stubRootSuccess() {
            stubFor(
                get("/verifiedTokens")
                    .willReturn(
                        aResponse()
                            .withStatus(200)
                            .withBody(
                                """{
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
                                }"""
                            )
                    )
            )
        }

        fun stubSessionsSuccess(session: String) {
            stubFor(
                post("/verifiedTokens/sessions")
                    .willReturn(
                        aResponse()
                            .withStatus(201)
                            .withHeader("Location", session)
                            .withBody(
                                """{
                                    "_links": {
                                        "curies": [
                                            {
                                              "templated": true,
                                              "name": "verifiedTokens",
                                              "href": "https://localhost:8443/rels/verifiedTokens/{rel}.json"
                                            }
                                        ],
                                        "verifiedTokens:session": {
                                            "href": "$session"
                                        }
                                    }
                                }"""
                            )
                    )
            )
        }
    }
}