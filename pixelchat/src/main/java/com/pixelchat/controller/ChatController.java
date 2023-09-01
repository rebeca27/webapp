package com.pixelchat.controller;

import com.pixelchat.model.ChatRoom;
import com.pixelchat.model.Message;
import com.pixelchat.model.User;
import com.pixelchat.service.ChatService;
import com.pixelchat.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/chatrooms")
public class ChatController {
    @Autowired
    private ChatService chatService;
    @Autowired
    private UserService userService; // Inject the UserService to fetch the User by email
    @Autowired
    private HttpSession session;


    @GetMapping
    public ResponseEntity<List<ChatRoom>> getAllChatRooms() {
        return ResponseEntity.ok(chatService.getAllChatRooms());
    }

    @GetMapping("/{chatroomId}/messages")
    public ResponseEntity<List<Message>> getMessagesForChatRoom(@PathVariable Long chatroomId) {
        return ResponseEntity.ok(chatService.getMessagesForChatRoom(chatroomId));
    }

    @PostMapping("/{chatroomId}/send")
    public ResponseEntity<String> sendMessage(@PathVariable Long chatroomId, @RequestBody Map<String, String> payload, @RequestHeader("User-Email") String email) {
        String content = payload.get("content");

        System.out.println(email);
        if(email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in.");
        }
        User user = userService.findByEmail(email);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        chatService.sendMessage(chatroomId, content, user);
        return ResponseEntity.ok("Message sent!");
    }


    private User getCurrentUser(HttpSession session) {
        String email = (String) session.getAttribute("loggedInEmail");
        if (email == null) {
            return null; // No user is logged in
        }
        return userService.findByEmail(email); // Fetch the user by email
    }

    @GetMapping("/currentUser")
    public ResponseEntity<User> getCurrentUserDetails(@RequestHeader("User-Email") String email) {
        User user = userService.findByEmail(email);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }


    @ExceptionHandler(ChatService.ChatRoomNotFoundException.class)
    public ResponseEntity<String> handleChatRoomNotFound(ChatService.ChatRoomNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

}


