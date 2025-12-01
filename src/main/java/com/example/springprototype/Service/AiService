package com.example.springprototype.Service;

import com.example.springprototype.Recipe;
import com.example.springprototype.Repository.RecipeRepository;
import com.openai.client.OpenAIClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import org.springframework.stereotype.Service;

import java.util.List;


public class AiService {

    private final OpenAIClient client;
    private final RecipeRepository recipeRepository;

    public AiService(OpenAIClient client, RecipeRepository recipeRepository) {
        this.client = client;
        this.recipeRepository = recipeRepository;
    }

    // First version: look at ALL recipes in the DB and ask AI for new ideas
    public String recommendFromExistingRecipes(int count) {
        List<Recipe> recipes = recipeRepository.findAll();

        StringBuilder sb = new StringBuilder();
        sb.append("You are an assistant for a recipe app.\n");
        sb.append("Here are some recipes currently in the app:\n\n");

        for (Recipe r : recipes) {
            sb.append(r.toString()).append("\n---\n");
        }

        sb.append("\nBased on these recipes, suggest ")
          .append(count)
          .append(" new recipe ideas with ingredients and short instructions.\n");

        ResponseCreateParams params = ResponseCreateParams.builder()
                .input(sb.toString())
                .model(ChatModel.GPT_4_1)   
                .build();

        Response response = client.responses().create(params);

        // Later we can clean this; for now just return the raw response as text
        return response.toString();
    }
}
