package com.example.springprototype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ReviewsService {

    @Autowired
    private ReviewsRepository reviewsRepository;
    public List<reviews> getAllReviews(){
        return reviewsRepository.findAll();
    }
}
