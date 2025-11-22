package com.example.springprototype;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
    @RequestMapping("/api/v1/review")
    public class ReviewsController
    {
        @Autowired
        private ReviewsService reviewsService;

        @GetMapping
        public ResponseEntity <List<reviews>> getAllReviews(){
            return new ResponseEntity<List<reviews>>(reviewsService.getAllReviews(),HttpStatus.OK);        }
    }
