package com.example.springprototype;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAIConfig {

    @Bean
    public OpenAIClient openAIClient() {
        //check that OPENAI_API_KEY is actually visible to the app ---
        String key = System.getenv("OPENAI_API_KEY");

        if (key == null) {
            System.out.println("DEBUG OPENAI_API_KEY: null (environment variable not found)");
        } else {
            // print only the first few characters so you can verify it's the right one
            int len = Math.min(12, key.length());
            String prefix = key.substring(0, len);
            System.out.println("DEBUG OPENAI_API_KEY prefix: " + prefix + "...");
        }
        

        // Let the official client read the key from the environment
        return OpenAIOkHttpClient.fromEnv();
    }
}

