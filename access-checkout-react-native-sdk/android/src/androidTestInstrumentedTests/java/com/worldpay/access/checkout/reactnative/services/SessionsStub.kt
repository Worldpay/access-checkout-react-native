package com.worldpay.access.checkout.reactnative.services

import com.github.tomakehurst.wiremock.client.WireMock.*

class SessionsStub {
    companion object {
        fun stubRootSuccess() {
            stubFor(
                get("/sessions")
                    .willReturn(
                        aResponse()
                            .withStatus(200)
                            .withBody(
                                """{
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
                                }"""
                            )
                    )
            )
        }

        fun stubSessionsPaymentsCvcSuccess(session: String) {
            stubFor(
                post("/sessions/payments/cvc")
                    .willReturn(
                        aResponse()
                            .withStatus(201)
                            .withHeader("Location", "$session")
                            .withBody(
                                """{
                                    "_links": {
                                        "sessions:session": {
                                        "href": "$session"
                                        },
                                        "curies": [
                                            {
                                                "href": "https://try.access.worldpay.com/rels/sessions/{rel}.json",
                                                "name": "sessions",
                                                "templated": true
                                            }
                                        ]
                                    }
                               }"""
                            )
                    )
            )
        }

        fun stubSessionsPaymentsCvcFailure(errorName: String, message: String) {
            stubFor(
                post("/sessions/payments/cvc")
                    .willReturn(
                        aResponse()
                            .withStatus(400)
                            .withBody(
                                """{
                                    "errorName": "$errorName",
                                    "message": "$message"
                               }"""
                            )
                    )
            )
        }
    }
}
