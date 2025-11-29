package com.example.springprototype.Controller;

import com.example.springprototype.Recipe;
import com.example.springprototype.Service.RecipeService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return new ResponseEntity<List<Recipe>>(recipeService.getAllRecipes(),HttpStatus.OK);
    }

    @PostMapping ("/addRecipe")
    public ResponseEntity<Recipe> createRecipe (@RequestBody Recipe recipe) {
        Recipe savedRecipe = recipeService.createRecipe(recipe);
        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
    }

    @GetMapping("/getRecipeByID")
    public ResponseEntity<Recipe> getRecipeByID(@RequestParam String id) {
        ObjectId objectId = new ObjectId(id); // needs correct import

        return recipeService.getRecipeByID(objectId)
                .map(recipe -> ResponseEntity.ok(recipe))
                .orElse(ResponseEntity.notFound().build());
    }
}
