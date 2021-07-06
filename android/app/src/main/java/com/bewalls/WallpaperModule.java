package com.bewalls;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import android.app.WallpaperManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;
import java.util.Map;
import java.util.HashMap;

public class WallpaperModule extends ReactContextBaseJavaModule {
    WallpaperModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void setWallpaper(){
        Log.d("WALLPAPER","setWallpaperCalled!");
    }

    @Override
    public String getName() {
        return "WallpaperModule";
    }
}
