package com.worldpay.access.checkout.reactnative.services

import android.content.Context
import android.util.Log
import com.github.tomakehurst.wiremock.WireMockServer
import com.github.tomakehurst.wiremock.common.ConsoleNotifier
import com.github.tomakehurst.wiremock.core.WireMockConfiguration
import com.github.tomakehurst.wiremock.extension.responsetemplating.ResponseTemplateTransformer
import com.google.android.gms.security.ProviderInstaller
import com.worldpay.access.checkout.reactnative.services.ssl.client.TrustAllSSLSocketFactory
import com.worldpay.access.checkout.reactnative.services.ssl.server.CustomHttpServerFactory
import java.io.File
import java.io.FileOutputStream
import javax.net.ssl.HttpsURLConnection

object MockServer {
    const val PORT = 8443
    private lateinit var context: Context
    private lateinit var wireMockServer: WireMockServer
    private lateinit var baseUrl: String

    private var hasStarted = false

    fun startStubServices(context: Context, port: Int = PORT) {
        Log.d("MockServer", "Starting WireMock server!")

        MockServer.context = context

        val keyStoreFile = File(context.cacheDir, "wiremock.bks")
        val keystoreInputStream = context.assets.open("wiremock.bks")
        keystoreInputStream.copyTo(FileOutputStream(keyStoreFile))

        HttpsURLConnection.setDefaultSSLSocketFactory(TrustAllSSLSocketFactory())

        wireMockServer = WireMockServer(
            WireMockConfiguration
                .options()
                .notifier(ConsoleNotifier(true))
                .httpsPort(port)
                .httpServerFactory(CustomHttpServerFactory())
                .keystorePath(keyStoreFile.absolutePath)
                .keystoreType("BKS")
                .keystorePassword("")
                .extensions(ResponseTemplateTransformer(false))
        )

        Thread {
            wireMockServer.start()
            hasStarted = true
        }.start()

        waitForWiremock()
    }

    fun stopStubServices() {
        wireMockServer.stop()
    }

    private fun waitForWiremock() {
        do {
            Thread.sleep(1000)
            Log.d("MockServer", "Waiting for wiremock to start!")
        } while (!hasStarted)
        Log.d("MockServer", "Started wiremock!!")
        baseUrl = wireMockServer.baseUrl()
    }
}
