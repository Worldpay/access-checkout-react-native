package com.worldpay.access.checkout.reactnative.stub

import com.github.tomakehurst.wiremock.client.WireMock.*

class AccessServicesRootStub {
    companion object {
        fun stubRootSuccess() {
            stubFor(
                get("/")
                    .willReturn(
                        aResponse()
                            .withStatus(200)
                            .withBody(
                                """{
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
                            }"""
                            )
                    )
            )
        }
    }
}