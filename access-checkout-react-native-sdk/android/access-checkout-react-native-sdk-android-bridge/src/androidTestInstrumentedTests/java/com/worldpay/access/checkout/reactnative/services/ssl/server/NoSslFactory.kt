package com.worldpay.access.checkout.reactnative.services.ssl.server

import wiremock.org.eclipse.jetty.util.ssl.SslContextFactory
import javax.net.ssl.SSLEngine

class NoSslFactory : SslContextFactory() {

    override fun customize(sslEngine: SSLEngine) {}
}
