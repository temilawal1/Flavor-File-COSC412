package com.example.springprototype.Controller;

import com.example.springprototype.Repository.UserRepository;
import com.example.springprototype.Service.UserServices;
import com.example.springprototype.Users;
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
    public ResponseEntity<Users> login(@RequestParam String username, @RequestParam String password) {
        Optional<Users> user=userServices.getUserandPass(username, password);
        return null;

    }

    @PostMapping("/addUser")
    public ResponseEntity<Users> createUser(@RequestBody Users user){
        Users savedUser =  userServices.createUser(user);
        return new ResponseEntity<>(savedUser,HttpStatus.OK);
    }



}
