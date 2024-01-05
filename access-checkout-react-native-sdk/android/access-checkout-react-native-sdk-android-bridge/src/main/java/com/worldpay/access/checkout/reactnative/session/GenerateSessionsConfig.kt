package com.worldpay.access.checkout.reactnative.session

import com.worldpay.access.checkout.client.session.model.SessionType

class GenerateSessionsConfig(
    val baseUrl: String,
    val merchantId: String,
    val panId: String?,
    val expiryDateId: String?,
    val cvcId: String?,
    val sessionTypes: List<SessionType>,
    val reactNativeSdkVersion: String
)

