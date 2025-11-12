package com.worldpay.access.checkout.reactnative.instrumentation.services

import android.content.Context
import android.util.Log
import com.github.tomakehurst.wiremock.WireMockServer
import com.github.tomakehurst.wiremock.client.WireMock.aResponse
import com.github.tomakehurst.wiremock.client.WireMock.get
import com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo
import com.github.tomakehurst.wiremock.common.ConsoleNotifier
import com.github.tomakehurst.wiremock.core.WireMockConfiguration
import com.github.tomakehurst.wiremock.extension.responsetemplating.ResponseTemplateTransformer
import com.worldpay.access.checkout.reactnative.instrumentation.services.ssl.client.TrustAllSSLSocketFactory
import com.worldpay.access.checkout.reactnative.instrumentation.services.ssl.server.CustomHttpServerFactory
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL
import javax.net.ssl.HttpsURLConnection
import kotlin.system.measureTimeMillis

object MockServer {
    const val PORT = 8443
    private lateinit var wireMockServer: WireMockServer
    private var started = false
    private var keystoreFile: File? = null

    @Volatile
    var baseUrl: String? = null
        private set

    @Synchronized
    fun startStubServices(context: Context, port: Int = PORT, timeoutMs: Long = 10_000) {
        if (isRunning()) {
            Log.d("MockServer", "WireMock already started at $baseUrl")
            return
        }

        prepareKeystore(context)
        HttpsURLConnection.setDefaultSSLSocketFactory(TrustAllSSLSocketFactory())

        wireMockServer = WireMockServer(
            WireMockConfiguration.options()
                .notifier(ConsoleNotifier(false))
                .httpsPort(port)
                .httpServerFactory(CustomHttpServerFactory())
                .keystorePath(requireNotNull(keystoreFile).absolutePath)
                .keystoreType("BKS")
                .keystorePassword("")
                .extensions(ResponseTemplateTransformer(false))
                .asynchronousResponseEnabled(true)
        )

        val duration = measureTimeMillis {
            wireMockServer.start()
            started = true
            addHealthStub()
            ensureStarted(timeoutMs)
        }
        baseUrl = wireMockServer.baseUrl()
        Log.d("MockServer", "WireMock started in ${duration}ms at $baseUrl")
    }

    @Synchronized
    fun stopStubServices() {
        if (!started) return
        try {
            wireMockServer.stop()
        } finally {
            started = false
            baseUrl = null
        }
        Log.d("MockServer", "WireMock stopped")
    }

    fun isRunning(): Boolean = started && wireMockServer.isRunning

    private fun prepareKeystore(context: Context) {
        if (keystoreFile != null) return
        keystoreFile = File(context.cacheDir, "wiremock.bks").also { file ->
            context.assets.open("wiremock.bks").use { input ->
                FileOutputStream(file).use { out -> input.copyTo(out) }
            }
        }
    }

    private fun ensureStarted(timeoutMs: Long) {
        val startTime = System.currentTimeMillis()
        while (!wireMockServer.isRunning) {
            if (System.currentTimeMillis() - startTime > timeoutMs) {
                throw IllegalStateException("WireMock failed to start within ${timeoutMs}ms")
            }
            Thread.sleep(50)
        }
        healthCheck(timeoutMs - (System.currentTimeMillis() - startTime))
    }

    private fun healthCheck(remainingMs: Long) {
        val healthUrl = "${wireMockServer.baseUrl()}/health"
        val deadline = System.currentTimeMillis() + remainingMs
        while (System.currentTimeMillis() < deadline) {
            try {
                val conn = (URL(healthUrl).openConnection() as HttpURLConnection).apply {
                    requestMethod = "GET"
                    connectTimeout = 500
                    readTimeout = 500
                }
                val body = runCatching { conn.inputStream.bufferedReader().use { it.readText() } }.getOrDefault("")
                val code = conn.responseCode
                if (code == 200) {
                    Log.d("MockServer", "Health check OK (200 /health)")
                    return
                } else {
                    Log.d("MockServer", "Health check waiting (code=$code body=$body)")
                }
            } catch (e: Exception) {
                Log.d("MockServer", "Health check retry: ${e.message}")
                Thread.sleep(100)
            }
        }
        throw IllegalStateException("WireMock health check failed at $healthUrl")
    }

    @Synchronized
    fun addHealthStub() {
        wireMockServer.stubFor(
            get(urlEqualTo("/health"))
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("{\"status\":\"OK\"}")
                )
        )
        Log.d("MockServer", "/health stub added")
    }
}