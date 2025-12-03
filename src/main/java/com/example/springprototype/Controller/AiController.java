package com.example.springprototype.Controller;

import com.example.springprototype.Service.AiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/recommend")   // <-- IMPORTANT: has a path
    public String recommend(@RequestParam(defaultValue = "3") int count) {
        return aiService.recommendFromExistingRecipes(count);
    }
}
