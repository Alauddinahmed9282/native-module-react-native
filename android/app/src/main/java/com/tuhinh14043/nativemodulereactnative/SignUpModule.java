package com.tuhinh14043.nativemodulereactnative;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SignUpModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private final static int SIGN_UP_REQUEST_CODE =1;
    private Callback successCallback;

    public SignUpModule(ReactApplicationContext reactApplicationContext){
        super(reactApplicationContext);
        reactApplicationContext.addActivityEventListener(this);
    }
    @Override
    public void onActivityResult(@NonNull Activity activity, int requestCode, int resultCode, @Nullable Intent intent) {
        if(resultCode == Activity.RESULT_OK && requestCode == SIGN_UP_REQUEST_CODE){
            String name = intent.getStringExtra("name");
            String email = intent.getStringExtra("email");
            successCallback.invoke(name, email);
        }
    }

    @ReactMethod
    public void openSignUpScreen(Callback callback){
        Activity currentActivity = getCurrentActivity();
        if(currentActivity != null){
            successCallback=callback;
            Intent intent = new Intent(currentActivity, SignUpActivity.class);
            currentActivity.startActivityForResult(intent, SIGN_UP_REQUEST_CODE);
        }

    }

    @Override
    public void onNewIntent(@NonNull Intent intent) {

    }

    /**
     * @return
     */
    @NonNull
    @Override
    public String getName() {
        return "SignUpModule";
    }
}
