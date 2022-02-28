package com.worldpay.access.checkout.reactnative

import android.os.Bundle
import androidx.activity.ComponentActivity
import com.facebook.soloader.SoLoader
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.MainScope

class EmptyInstrumentedTestsActivity : ComponentActivity(),
    CoroutineScope by MainScope() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        SoLoader.init(this, false)
    }
}