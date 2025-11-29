package com.example.springprototype.Service;

import com.example.springprototype.Repository.UserRepository;
import com.example.springprototype.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<Users> getUserandPass(String userName, String passWord){return userRepository.findByUserNameAndPassWord(userName,passWord);}

    public Users createUser(Users user){
        return userRepository.insert(user);
    }
}
