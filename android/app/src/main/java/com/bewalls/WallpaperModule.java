package com.bewalls;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;

import android.app.WallpaperManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.IOException;

import com.facebook.react.bridge.Callback;
import java.util.Map;
import java.util.HashMap;

public class WallpaperModule extends ReactContextBaseJavaModule {
    WallpaperModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void setWallpaper(String uri, Callback callback){
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance(this.getReactApplicationContext());
            File storage = Environment.getExternalStorageDirectory();
            File wallpaper = new File(uri);
            Bitmap bitmap = BitmapFactory.decodeFile(wallpaper.getAbsolutePath());
            try {
                wallpaperManager.setBitmap(bitmap);
                Log.d("path", storage.getAbsolutePath());
                Log.d("WALLPAPER", "setWallpaperCalled!");
                callback.invoke("success");
            } catch (IOException e) {
                e.printStackTrace();
                callback.invoke("failed");
            }

        } catch (Exception e) {
            Log.d("failed", "set wallpaper!");
            callback.invoke("failed");
        }
    }

    @Override
    public String getName() {
        return "WallpaperModule";
    }
}
