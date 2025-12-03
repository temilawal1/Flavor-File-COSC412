package com.example.springprototype.Service;

import com.example.springprototype.Recipe;
import com.example.springprototype.Repository.RecipeRepository;
import com.openai.client.OpenAIClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiService {

    private final OpenAIClient client;
    private final RecipeRepository recipeRepository;

    public AiService(OpenAIClient client, RecipeRepository recipeRepository) {
        this.client = client;
        this.recipeRepository = recipeRepository;
    }

    public String recommendFromExistingRecipes(int count) {
        List<Recipe> recipes = recipeRepository.findAll();

        StringBuilder sb = new StringBuilder();
        sb.append("You are a helpful cooking assistant for a recipe app called FlavorFile.\n");
        sb.append("Here are some recipes currently in the app:\n\n");

        for (Recipe r : recipes) {
            sb.append("- ").append(r.getRecipeName()).append("\n");
        }

        sb.append("\nBased on these recipes, suggest ")
          .append(count)
          .append(" new creative recipe ideas. For each recipe, provide:\n");
        sb.append("1. Recipe name\n");
        sb.append("2. List of ingredients\n");
        sb.append("3. Brief cooking instructions\n");

        ResponseCreateParams params = ResponseCreateParams.builder()
                .input(sb.toString())
                .model(ChatModel.GPT_4O_MINI)
                .build();

        Response response = client.responses().create(params);

        return response.output().toString();
    }

    public String recommendFromIngredients(List<String> ingredients, int count) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are a helpful cooking assistant for a recipe app called FlavorFile.\n");
        sb.append("The user has the following ingredients available in their kitchen:\n\n");

        for (String ingredient : ingredients) {
            sb.append("- ").append(ingredient).append("\n");
        }

        sb.append("\nBased on these ingredients, suggest ")
          .append(count)
          .append(" creative recipe ideas that can be made using primarily these ingredients.\n");
        sb.append("It's okay to assume the user has basic pantry staples like salt, pepper, oil, etc.\n");
        sb.append("For each recipe, provide:\n");
        sb.append("1. Recipe name\n");
        sb.append("2. Full list of ingredients (mark any not in the user's list with *)\n");
        sb.append("3. Step-by-step cooking instructions\n");

        ResponseCreateParams params = ResponseCreateParams.builder()
                .input(sb.toString())
                .model(ChatModel.GPT_4O_MINI)
                .build();

        Response response = client.responses().create(params);

        return response.output().toString();
    }
}