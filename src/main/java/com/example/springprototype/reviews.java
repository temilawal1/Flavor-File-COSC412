package com.example.springprototype;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;
import java.util.List;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class reviews {
    @Id
    private ObjectId id;

    private String username;

    private String recipeID;

    private String author;

    private String userKey;

    private String reviewText;

    private double rating;

}
