package com.example.springprototype;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SpringPrototypeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringPrototypeApplication.class, args);
    }
    @GetMapping("/")
    public String helloWorld(){
        return "index.html";
    }

}
