package com.pixelchat.controller;

import com.pixelchat.dto.UserStatistics;
import com.pixelchat.model.FriendRequest;
import com.pixelchat.model.User;
import com.pixelchat.repository.ChatRoomRepository;
import com.pixelchat.repository.FriendRequestRepository;
import com.pixelchat.repository.MessageRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class UserController {


    @Autowired
    private final UserService userService;

    @Autowired
    private final ImageService imageService;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private MessageRepository messageRepo; // Assuming you have a repository for messages

    @Autowired
    private ChatRoomRepository chatRoomRepo; // For chat rooms

    @Autowired
    private FriendRequestRepository friendRequestRepo; // For friend requests

    @Autowired
    public UserController(UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("email") String email,
                                          @RequestParam("password") String password,
                                          @RequestParam("color") String color,
                                          @RequestParam("profileImage") MultipartFile profileImage) throws Exception {

        // Email validation
        if (!email.matches("^([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z\\-]+\\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\\]?)$")) {
            return ResponseEntity.badRequest().body("Invalid email format.");
        }

        // Password strength check
        if (!password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$")) {
            return ResponseEntity.badRequest().body("Password must be at least 8 characters, contain a lowercase letter, uppercase letter, digit, and special character.");
        }


        // Profile image check (size, for example, limited to 5MB)
        if (profileImage.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body("Profile image should be less than 5MB.");
        }

        if (profileImage == null || profileImage.isEmpty()) {
            return ResponseEntity.badRequest().body("No profile image provided.");
        }

        // Existing user check
        User existingUser = userService.findByEmail(email);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

        String salt = UserService.generateSalt();

        byte[] profileImageData = null;
        if (!profileImage.isEmpty()) {
            try {
                String contentType = profileImage.getContentType();
                if(!Arrays.asList("image/jpeg", "image/png", "image/gif").contains(contentType)) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("Invalid file type.");
                }

                profileImageData = profileImage.getBytes();


                if (profileImageData.length == 0) {
                    return ResponseEntity.badRequest().body("Profile image data is empty.");
                }
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
        newUser.setSalt(salt);  // store the salt
        newUser.setPassword(userService.hashWithSalt(password, salt));  // use salted password hashing
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
    public ResponseEntity<?> loginUser(@RequestParam("email") String email, @RequestParam("password") String password) {


        if (!email.matches("^([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z\\-]+\\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\\]?)$")) {
            return ResponseEntity.badRequest().body("Invalid input format.");
        }

        User user = userService.findByEmail(email);
        if (user == null) {
            //  Avoid Revealing Specific Failures
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }


        String userSalt = user.getSalt();

        if (!userService.isPasswordValid(password, userSalt, user.getPassword())) {
            //  Avoid Revealing Specific Failures
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }

        // Return a successful login response
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("email", email);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/target-share")
    public ResponseEntity<Map<String, String>> getTargetShare(HttpSession session) {
        String email = (String) session.getAttribute("loggedInEmail");

        if(email == null) {
            // Handle the case where the email isn't in the session
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No email found in session."));
        }

        // Retrieve the image share based on the email
        byte[] shareFromDb = userService.fetchShareByEmail(email);
        if (shareFromDb == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        String shareBase64 = Base64.getEncoder().encodeToString(shareFromDb);
        Map<String, String> response = new HashMap<>();
        response.put("targetShare", shareBase64);
        return ResponseEntity.ok(response);
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

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Boolean>> logout(HttpSession session) {
        try {
            // Invalidate the session to log out the user
            session.invalidate();

            // Optionally, send a notification to the tech team or perform other actions

            Map<String, Boolean> response = new HashMap<>();
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Boolean> response = new HashMap<>();
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PostMapping("/send-alert-email")
    public ResponseEntity<String> sendAlertEmail(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Unauthorized Login Attempt");
        message.setText("There was an unauthorized login attempt on your account.");

        try {
            mailSender.send(message);
            return ResponseEntity.ok("{\"message\":\"Email sent successfully\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"Error sending email\"}");
        }
    }
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/email/{userEmail}/statistics")
    public UserStatistics getUserStatisticsByEmail(@PathVariable String userEmail) {
        User user = userService.findByEmail(userEmail);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        Long userId = user.getId();
        UserStatistics stats = new UserStatistics();

        stats.setSentMessages(messageRepo.countByUser_Id(userId));
        stats.setReceivedMessages(messageRepo.countReceivedMessages(userId));
        stats.setPeakTrafficTime(calculatePeakTrafficTime(userId));
        stats.setActiveChats(messageRepo.countDistinctChatRoomsByUserId(userId));
        FriendRequest.Status statusEnum = FriendRequest.Status.valueOf("PENDING");
        stats.setPendingFriendRequests(friendRequestRepo.countByReceiver_IdAndStatus(userId, statusEnum));


        return stats;
    }

    private String calculatePeakTrafficTime(Long userId) {
        List<Object[]> hourCounts = messageRepo.findMessageCountsGroupedByHour(userId);

        if (hourCounts.isEmpty()) {
            return "No active traffic";
        }

        int peakHour = (int) hourCounts.get(0)[0];
        return peakHour + " PM - " + (peakHour + 1) + " PM";
    }


}
