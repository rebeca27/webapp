package com.pixelchat.controller;

import com.pixelchat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pixelchat.service.UserService;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class UserController {
    @Autowired
    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("email") String email,
                                             @RequestParam("password") String password,
                                             @RequestParam("color") String color,
                                             @RequestParam("profileImage") MultipartFile profileImage) {


        // Check if a user with the given email already exists
        User existingUser = userService.findByEmail(email);
        if (existingUser != null) {
            // User already exists, return a bad request response with a descriptive message
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

        // Process the uploaded image, if needed
        byte[] profileImageData = null;
        if (!profileImage.isEmpty()) {
            try {
                profileImageData = profileImage.getBytes();
            } catch (IOException e) {
                e.printStackTrace();
                // Handle the exception appropriately, e.g., return an error response
            }
        }

        // Create a new user object and set the attributes
        User newUser = new User();
        newUser.setPassword(userService.hashPassword(password));
        newUser.setEmail(email);
        newUser.setColor(color);
        newUser.setProfileImage(profileImageData);

        // Save the user to the database
        User savedUser = userService.save(newUser);

        // Return the saved user in the response body with a status of 200 OK
        return ResponseEntity.ok("User registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam("email") String email,
                                       @RequestParam("password") String password) {

        // Fetch the user by email
        User user = userService.findByEmail(email);

        // If user doesn't exist or password is incorrect, return unauthorized
        if (user == null || !userService.isPasswordValid(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }

        // If the user exists and the password matches, you might want to generate a JWT or a session token here
        // ... token generation logic ...

        // Return a successful login response
        return ResponseEntity.ok("Login successful");
        // Optionally: return ResponseEntity.ok().body(new AuthenticationResponse(token));
    }

}


