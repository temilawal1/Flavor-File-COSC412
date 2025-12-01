package com.example.springprototype.Service;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


public class OpenAIConfig {

    
    public OpenAIClient openAIClient() {
        return OpenAIOkHttpClient.fromEnv();
    }
}
