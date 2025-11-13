package com.worldpay.access.checkout.reactnative.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope

class EmptyInstrumentedTestsActivity : ComponentActivity(),
    CoroutineScope by MainScope() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, OpenSourceMergedSoMapping)
    }
}