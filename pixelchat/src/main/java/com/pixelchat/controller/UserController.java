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
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setColor(color);
        newUser.setProfileImage(profileImageData);

        // Save the user to the database
        User savedUser = userService.save(newUser);

        // Return the saved user in the response body with a status of 200 OK
        return ResponseEntity.ok(savedUser);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body("File size is too large! Please upload a smaller file.");
    }
}


