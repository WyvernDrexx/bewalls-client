package com.bewalls;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.NativeModule;

import android.app.Activity;
import android.app.WallpaperManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Insets;
import android.graphics.Rect;
import android.media.ThumbnailUtils;
import android.os.Build;
import android.os.Environment;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.WindowInsets;
import android.view.WindowMetrics;

import java.io.File;
import java.io.IOException;

import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;

public class WallpaperModule extends ReactContextBaseJavaModule {
    WallpaperModule(ReactApplicationContext context) {
        super(context);
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void setWallpaper(String uri, int destination, int width, int height, Callback callback) {
        try {
            WallpaperManager wallpaperManager = WallpaperManager.getInstance(this.getReactApplicationContext());
            File storage = Environment.getExternalStorageDirectory();
            File wallpaper = new File(uri);
            Bitmap bitmap = BitmapFactory.decodeFile(wallpaper.getAbsolutePath());
//            Bitmap scaledBitmap = Bitmap.createScaledBitmap(bitmap, width, height, true);
//            Bitmap scaledBitmap = ThumbnailUtils.extractThumbnail(bitmap,width, height);
            try {
                if(destination == 3){
                    wallpaperManager.setBitmap(bitmap, null, false, 1);
                    wallpaperManager.setBitmap(bitmap, null, false, 2);
                }else {
                    wallpaperManager.setBitmap(bitmap, null, false, destination);
                }
                Log.d("path", storage.getAbsolutePath());
                Log.d("WALLPAPER", "setWallpaperCalled!");
                callback.invoke("success");
            } catch (IOException e) {
                e.printStackTrace();
                callback.invoke("failed");
            }

        } catch (Exception e) {
            e.printStackTrace();
            Log.d("failed", "set wallpaper!");
            callback.invoke("failed");
        }
    }

    @Override
    public String getName() {
        return "WallpaperModule";
    }
}
