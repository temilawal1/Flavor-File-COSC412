package com.example.springprototype;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
public interface ReviewsRepository extends MongoRepository<reviews, ObjectId> {


}
