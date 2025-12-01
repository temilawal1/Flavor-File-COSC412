package com.example.springprototype;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;
import java.util.List;

@Document(collection = "recipes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id
    private ObjectId id;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getUserKey() {
        return userKey;
    }

    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public List<String> getReviewsLeft() {
        return reviewsLeft;
    }

    public void setReviewsLeft(List<String> reviewsLeft) {
        this.reviewsLeft = reviewsLeft;
    }

    public List<String> getImgLinks() {
        return imgLinks;
    }

    public void setImgLinks(List<String> imgLinks) {
        this.imgLinks = imgLinks;
    }

    public List<String> getIngredients(){
        return ingredients;
    }

    public void setIngredients(List<String> ingredients){
        this.ingredients = ingredients;
    }

    public List<String> getPrepSteps(){
        return prepSteps;
    }

    public void setPrepSteps(List<String> prepSteps){
        this.prepSteps = prepSteps;
    }

    public String getServingSize(){
        return servingSize;
    }

    public void setServingSize(String servingSize){
        this.servingSize = servingSize;
    }

    public String getServes(){
        return serves;

    }
    public void setServes(String serves){
        this.serves = serves;
    }
    
    public String prepTime(){
        return prepTime;
    }

    public void setPrepTime(String prepTime){
        this.prepTime = prepTime;
    }

    
    private List<String> ingredients; //

    private List<String> prepSteps; //

    private String servingSize; //

    private String serves; //

    private String prepTime; //

    
    private String username;

    private List<String> courses;

    private String author;

    private String userKey;

    private String recipeName;

    private List<String> reviewsLeft;

    private List<String> imgLinks;

}
