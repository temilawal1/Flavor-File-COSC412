package com.example.springprototype.Controller;

import com.example.springprototype.Repository.UserRepository;
import com.example.springprototype.Service.UserServices;
import com.example.springprototype.UserLogin;
import com.example.springprototype.Users;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserControllers {


    @Autowired
    private UserServices userServices;


    @GetMapping
    public ResponseEntity<List<Users>> allUsers(){
        return new ResponseEntity<List<Users>>(userServices.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLogin userLogin) {

        Optional<Users> user = userServices.getUserByUsername(userLogin.getUserName());

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        // Compare password here (do not return user until verified)
        if (!user.get().getPassWord().equals(userLogin.getPassWord())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }

        return ResponseEntity.ok(user.get());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        Optional<Users> existingUser = userServices.getUserByUsername(user.getUserName());
        //Check if username already exists
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already taken");
        }

        //Check if email already exists
        Optional<Users> existingEmail = userServices.getUserByEmail(user.getEmail());
        if (existingEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered");
        }

        Users savedUser = userServices.createUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/addUser")
    public ResponseEntity<Users> createUser(@RequestBody Users user){
        Users savedUser =  userServices.createUser(user);
        return new ResponseEntity<>(savedUser,HttpStatus.OK);
    }



}
