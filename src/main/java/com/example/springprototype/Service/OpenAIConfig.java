package com.example.springprototype;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


public class OpenAIConfig {

   
    public OpenAIClient openAIClient() {
        // Uses OPENAI_API_KEY from our environment variables
        return OpenAIOkHttpClient.fromEnv();
    }
}
