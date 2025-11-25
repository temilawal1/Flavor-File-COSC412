package com.example.springprototype.Repository;

import com.example.springprototype.Recipe;
import com.example.springprototype.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<Users, ObjectId> {

}
