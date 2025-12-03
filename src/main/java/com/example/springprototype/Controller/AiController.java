package com.example.springprototype.Controller;

import com.example.springprototype.Service.AiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/recommend")
    public String recommend(@RequestParam(defaultValue = "3") int count) {
        return aiService.recommendFromExistingRecipes(count);
    }

    @PostMapping("/from-ingredients")
    public String fromIngredients(@RequestBody IngredientsRequest request) {
        return aiService.recommendFromIngredients(request.getIngredients(), request.getCount());
    }

    public static class IngredientsRequest {
        private List<String> ingredients;
        private int count = 3;

        public List<String> getIngredients() { return ingredients; }
        public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }
        public int getCount() { return count; }
        public void setCount(int count) { this.count = count; }
    }
}