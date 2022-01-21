package com.worldpay.access.checkout.reactnative.instrumentedTests.stubs

import com.github.tomakehurst.wiremock.client.WireMock

class CardBrandsStub {
    companion object {
        fun stubCardBrandsRules() {
            WireMock.stubFor(
                WireMock.get("/access-checkout/cardTypes.json")
                    .willReturn(
                        WireMock.aResponse()
                            .withStatus(200)
                            .withBody(
                                """
                                [
                                    {
                                        "name": "visa",
                                        "pattern": "^(?!^493698\\d*${'$'})4\\d*${'$'}",
                                        "panLengths": [
                                        13,
                                        16,
                                        18,
                                        19
                                        ],
                                        "cvvLength": 3,
                                        "images": [
                                        {
                                            "type": "image/png",
                                            "url": "https://localhost:8443/access-checkout/assets/visa.png"
                                        },
                                        {
                                            "type": "image/svg+xml",
                                            "url": "https://localhost:8443/access-checkout/assets/visa.svg"
                                        }
                                        ]
                                    },
                                    {
                                        "name": "mastercard",
                                        "pattern": "^(5[1-5]|2[2-7])\\d*${'$'}",
                                        "panLengths": [
                                        16
                                        ],
                                        "cvvLength": 3,
                                        "images": [
                                        {
                                            "type": "image/png",
                                            "url": "https://localhost:8443/access-checkout/assets/mastercard.png"
                                        },
                                        {
                                            "type": "image/svg+xml",
                                            "url": "https://localhost:8443/access-checkout/assets/mastercard.svg"
                                        }
                                        ]
                                    },
                                    {
                                        "name": "amex",
                                        "pattern": "^3[47]\\d*${'$'}",
                                        "panLengths": [
                                        15
                                        ],
                                        "cvvLength": 4,
                                        "images": [
                                        {
                                            "type": "image/png",
                                            "url": "https://localhost:8443/access-checkout/assets/amex.png"
                                        },
                                        {
                                            "type": "image/svg+xml",
                                            "url": "https://localhost:8443/access-checkout/assets/amex.svg"
                                        }
                                        ]
                                    },
                                    {
                                        "name": "jcb",
                                        "pattern": "^(35[2-8]|2131|1800|(308[8-9]|309[0-4])|(309[6-9]|310[0-2])|(311[2-9]|3120)|315[8-9]|(333[7-9]|334[0-9]))\\d*${'$'}",
                                        "panLengths": [
                                        16,
                                        17,
                                        18,
                                        19
                                        ],
                                        "cvvLength": 3,
                                        "images": [
                                        {
                                            "type": "image/png",
                                            "url": "https://localhost:8443/access-checkout/assets/jcb.png"
                                        },
                                        {
                                            "type": "image/svg+xml",
                                            "url": "https://localhost:8443/access-checkout/assets/jcb.svg"
                                        }
                                        ]
                                    },
                                    {
                                        "name": "discover",
                                        "pattern": "^(6011|64[4-9]|65)\\d*${'$'}",
                                        "panLengths": [
                                        16,
                                        19
                                        ],
                                        "cvvLength": 3,
                                        "images": [
                                        {
                                            "type": "image/png",
                                            "url": "https://localhost:8443/access-checkout/assets/discover.png"
                                        },
                                        {
                                            "type": "image/svg+xml",
                                            "url": "https://localhost:8443/access-checkout/assets/discover.svg"
                                        }
                                        ]
                                    },
                                    {
                                        "name": "diners",
                                        "pattern": "^(30([0-5]|95)|36|38|39)\\d*${'$'}",
                                        "panLengths": [
                                        14,
                                        16,
                                        19
                                        ],
                                        "cvvLength": 3,
                                        "images": [
                                        {
                                            "type": "image/png",
                                            "url": "https://localhost:8443/access-checkout/assets/diners.png"
                                        },
                                        {
                                            "type": "image/svg+xml",
                                            "url": "https://localhost:8443/access-checkout/assets/diners.svg"
                                        }
                                        ]
                                    },
                                    {
                                        "name": "maestro",
                                        "pattern": "^(493698|(50[0-5][0-9]{2}|506[0-5][0-9]|5066[0-9])|(5067[7-9]|506[89][0-9]|50[78][0-9]{2})|5[6-9]|63|67)\\d*${'$'}",
                                        "panLengths": [
                                        12,
                                        13,
                                        14,
                                        15,
                                        16,
                                        17,
                                        18,
                                        19
                                        ],
                                        "cvvLength": 3,
                                        "images": [
                                        {
                                            "type": "image/png",
                                            "url": "https://localhost:8443/access-checkout/assets/maestro.png"
                                        },
                                        {
                                            "type": "image/svg+xml",
                                            "url": "https://localhost:8443/access-checkout/assets/maestro.svg"
                                        }
                                        ]
                                    }
                                ]
                                """.trimIndent()
                            )
                    )
            )
        }
    }
}