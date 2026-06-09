package com.navigationapp

import android.os.Bundle   // ✅ IMPORTANT
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "navigationapp"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  // ✅ ADD THIS BLOCK (FIX)
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}