package com.example.springprototype.Service;

import com.example.springprototype.Repository.ReviewsRepository;
import com.example.springprototype.reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ReviewsService {

    @Autowired
    private ReviewsRepository reviewsRepository;
    public List<reviews> getAllReviews(){
        return reviewsRepository.findAll();
    }
    @Autowired
    private MongoTemplate mongoTemplate;
    public reviews createReview(String reviewBody, String recipeID){
        reviews review = new reviews(reviewBody);
        reviewsRepository.insert(review);

        mongoTemplate.update(reviews.class)
                .matching(Criteria.where("recipeID").is(recipeID))
                .apply(new Update().push("reviewIDs", review))
                .first();

        return review;
    }
}
