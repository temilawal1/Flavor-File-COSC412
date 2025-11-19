package com.example.springprototype;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


@Document(collection = "datas")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    private ObjectId userId;

    private String userName;

    private String passWord;

    private String email;

    private String phone;

    private List<String> madeRecipes;

    private List<String> savedRecipes;

    private List<String> commentsPosted;
}
