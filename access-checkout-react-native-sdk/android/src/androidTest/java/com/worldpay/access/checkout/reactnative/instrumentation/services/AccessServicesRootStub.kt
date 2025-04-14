package com.worldpay.access.checkout.reactnative.instrumentation.services

import com.github.tomakehurst.wiremock.client.WireMock.aResponse
import com.github.tomakehurst.wiremock.client.WireMock.get
import com.github.tomakehurst.wiremock.client.WireMock.stubFor

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
                                    "service:sessions": {
                                        "href": "https://localhost:8443/sessions"
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
