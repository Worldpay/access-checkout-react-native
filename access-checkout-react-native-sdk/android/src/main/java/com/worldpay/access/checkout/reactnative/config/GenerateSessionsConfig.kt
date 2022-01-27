package com.worldpay.access.checkout.reactnative.config

import com.worldpay.access.checkout.client.session.model.SessionType

class GenerateSessionsConfig(
    val baseUrl: String,
    val merchantId: String,
    val panValue: String,
    val expiryValue: String,
    val cvcValue: String,
    val sessionTypes: List<SessionType>
)

