package com.example.springprototype.Repository;

import com.example.springprototype.Recipe;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, ObjectId> {

    Optional<Recipe> findRecipeById(ObjectId id);

}
