package com.example.springprototype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserControllers {

    @GetMapping
    public ResponseEntity<String> allUsers(){
        return new ResponseEntity<String>("all =Users", HttpStatus.OK);
    }

}
