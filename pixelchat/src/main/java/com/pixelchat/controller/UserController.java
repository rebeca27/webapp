package com.pixelchat.controller;

import com.pixelchat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pixelchat.service.UserService;
import com.pixelchat.service.ImageService;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

@RestController
public class UserController {


    @Autowired
    private final UserService userService;

    @Autowired
    private final ImageService imageService;  // Assuming you have an ImageService bean

    @Autowired
    public UserController(UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("email") String email,
                                          @RequestParam("password") String password,
                                          @RequestParam("color") String color,
                                          @RequestParam("profileImage") MultipartFile profileImage) throws IOException {

        // Existing user check
        User existingUser = userService.findByEmail(email);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

        byte[] profileImageData = null;
        if (!profileImage.isEmpty()) {
            try {
                profileImageData = profileImage.getBytes();
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing image.");
            }
        }

        // Create image shares and save them.
        List<BufferedImage> imageShares = imageService.createShares(profileImageData);
        byte[] share1 = convertBufferedImageToByteArray(imageShares.get(0));
        byte[] share2 = convertBufferedImageToByteArray(imageShares.get(1));

        User newUser = new User();
        newUser.setPassword(userService.hashPassword(password));
        newUser.setEmail(email);
        newUser.setColor(color);
        newUser.setShare1(share1);
        newUser.setShare2(share2);

        User savedUser = userService.save(newUser);

        Map<String, String> response = new HashMap<>();
        response.put("share1", Base64.getEncoder().encodeToString(share1));
        response.put("share2", Base64.getEncoder().encodeToString(share2));

        return ResponseEntity.ok(response);
    }

    private byte[] convertBufferedImageToByteArray(BufferedImage image) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, "png", baos);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return baos.toByteArray();
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
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("email", email);
        return ResponseEntity.ok(response);
        // Optionally: return ResponseEntity.ok().body(new AuthenticationResponse(token));
    }
    @PostMapping("/login3")
    public ResponseEntity<?> loginUser(@RequestParam("email") String email,
                                       @RequestParam("password") String password,
                                       @RequestParam("share1") MultipartFile share1) {

        User user = userService.findByEmail(email);
        if (user == null || !userService.isPasswordValid(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }

        byte[] uploadedShare1Bytes;
        try {
            uploadedShare1Bytes = share1.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing share.");
        }

        // Convert uploaded share1 to Base64 encoded string
        String uploadedShare1Base64 = Base64.getEncoder().encodeToString(uploadedShare1Bytes);

        // Convert share1 from DB to Base64 encoded string
        String share1FromDbBase64 = Base64.getEncoder().encodeToString(user.getShare1());

        if (!uploadedShare1Base64.equals(share1FromDbBase64)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid share.");
        }

        // Generate token or session info if required
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("email", email);
        return ResponseEntity.ok(response);
    }


    private BufferedImage convertByteArrayToBufferedImage(byte[] imageData) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        return ImageIO.read(bais);
    }
    @GetMapping("/target-color/{email}")
    public ResponseEntity<Map<String, String>> getTargetColor(@PathVariable String email) {
        String targetColor = userService.fetchTargetColorByEmail(email);
        if (targetColor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Map<String, String> response = new HashMap<>();
        response.put("targetColor", targetColor);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/compareShare")
    public ResponseEntity<Map<String, String>> compareShare(@RequestParam("email") String email,
                                                            @RequestParam("share1Upload") MultipartFile share1Upload) throws IOException {

        Map<String, String> response = new HashMap<>();

        // Get user by email
        User user = userService.findByEmail(email);

        if(user == null) {
            response.put("message", "User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Convert uploaded MultipartFile to byte array
        byte[] uploadedShareBytes = share1Upload.getBytes();

        // Convert uploaded share to Base64 encoded string
        String uploadedShareBase64 = Base64.getEncoder().encodeToString(uploadedShareBytes);

        // Get share1 from the database
        byte[] share1FromDb = user.getShare1();

        // Convert share1 from DB to Base64 encoded string
        String share1FromDbBase64 = Base64.getEncoder().encodeToString(share1FromDb);

        // Check for exact match first
        if(Arrays.equals(uploadedShareBytes, share1FromDb)) {
            response.put("message", "Uploaded share matches with the database.");
            return ResponseEntity.ok(response);
        }
        // Check if uploadedShareBase64 starts with share1FromDbBase64
        else if (uploadedShareBase64.startsWith(share1FromDbBase64)) {
            response.put("message", "Uploaded share matches with the database.");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Uploaded share does not match with the database.");
            response.put("uploadedShare", uploadedShareBase64);
            response.put("shareFromDatabase", share1FromDbBase64);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
