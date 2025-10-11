package com.tuhinh14043.nativemodulereactnative;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import android.content.Intent;
import androidx.annotation.Nullable;
import android.widget.Toast; 

public class SignUpActivity extends Activity {
    private EditText name, email;
    private Button btn;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        name= findViewById(R.id.name);
        email= findViewById(R.id.email);
        btn= findViewById(R.id.btn);

        btn.setOnClickListener(view ->{
            String mName= name.getText().toString();
            String email1= email.getText().toString();
            
            if(mName.isEmpty() || email1.isEmpty()){
                Toast.makeText(this, "Please fill all the fields", Toast.LENGTH_SHORT).show();
            }else{
                Intent resultIntent= new Intent();
                resultIntent.putExtra("name", mName);
                resultIntent.putExtra("email", email1);
                setResult(RESULT_OK, resultIntent);
                finish();
            }
        });
    }
}
