package com.pixelchat.controller;

import com.pixelchat.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pixelchat.service.UserService;

@RestController
public class UserController {

    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            // User already exists
            return ResponseEntity.badRequest().build();
        }

        User savedUser = userService.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            // User not found
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }
}


