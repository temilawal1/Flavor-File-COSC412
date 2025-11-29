package com.example.springprototype.Service;

import com.example.springprototype.Recipe;
import com.example.springprototype.Repository.RecipeRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes(){
        return recipeRepository.findAll();
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.insert(recipe);
    }

    public Optional<Recipe> getRecipeByID(ObjectId id) {
        return recipeRepository.findRecipeById(id);
    }
}
