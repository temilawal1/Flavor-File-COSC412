package com.example.springprototype.Controller;

import com.example.springprototype.Recipe;
import com.example.springprototype.Service.ReviewsService;
import com.example.springprototype.reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
    @RequestMapping("/api/v1/review")
    public class ReviewsController
    {
        @Autowired
        private ReviewsService reviewsService;

        @GetMapping
        public ResponseEntity <List<reviews>> getAllReviews(){
            return new ResponseEntity<List<reviews>>(reviewsService.getAllReviews(),HttpStatus.OK);        }

        @PostMapping ("/addReview")
        public ResponseEntity<reviews> createReview (@RequestBody reviews review) {
            reviews savedReview= reviewsService.createReview(review);
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        }
    }
