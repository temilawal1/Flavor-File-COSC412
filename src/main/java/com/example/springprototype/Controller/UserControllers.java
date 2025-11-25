package com.example.springprototype.Controller;

import com.example.springprototype.Repository.UserRepository;
import com.example.springprototype.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserControllers {

    @Autowired
    private UserRepository userRepository;


    @GetMapping
    public ResponseEntity<String> allUsers(){
        return new ResponseEntity<String>("all =Users", HttpStatus.OK);
    }

    @PostMapping("/addUser")
    public void addUser(@RequestBody Users user){
        System.out.println("Received user: " + user);
        userRepository.save(user);
        System.out.println("Added user: " + user);
    }



}
