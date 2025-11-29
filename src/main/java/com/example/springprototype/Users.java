package com.example.springprototype;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;


@Document(collection = "datas")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Users {
    @Id
    private ObjectId userId;

    private String userName;

    private String passWord;

    private String email;

    private String phone;

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getMadeRecipes() {
        return madeRecipes;
    }

    public void setMadeRecipes(List<String> madeRecipes) {
        this.madeRecipes = madeRecipes;
    }

    public List<String> getSavedRecipes() {
        return savedRecipes;
    }

    public void setSavedRecipes(List<String> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    public List<String> getCommentsPosted() {
        return commentsPosted;
    }

    public void setCommentsPosted(List<String> commentsPosted) {
        this.commentsPosted = commentsPosted;
    }

    private List<String> madeRecipes;

    private List<String> savedRecipes;

    private List<String> commentsPosted;
}
