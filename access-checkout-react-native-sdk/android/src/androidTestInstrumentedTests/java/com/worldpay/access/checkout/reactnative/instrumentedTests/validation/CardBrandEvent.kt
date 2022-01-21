package com.worldpay.access.checkout.reactnative.instrumentedTests.validation

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class CardBrandEvent constructor(map: ReadableMap?) {
    val name: String?
    val images: List<Image>

    init {
        if (map == null) {
            name = null
            images = emptyList()
        } else {
            name = map.getString("name")
            images = toImages(map.getArray("images"))
        }
    }

    private fun toImages(array: ReadableArray?): List<Image> {
        // val array = map.getArray(("images"))
        if (array == null || array.size() == 0) {
            return emptyList()
        }

        val list: MutableList<Image> = mutableListOf()
        for (i in 0 until array.size()) {
            val imageMap = array.getMap(i) ?: continue
            val url = imageMap.getString("url") ?: ""
            val type = imageMap.getString("type") ?: ""

            list.add(Image(url, type))
        }
        return list
    }

    class Image constructor(val url: String, val type: String)
}