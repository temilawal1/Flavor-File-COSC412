package com.example.springprototype.Repository;

import com.example.springprototype.reviews;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewsRepository extends MongoRepository<reviews, ObjectId> {


}
