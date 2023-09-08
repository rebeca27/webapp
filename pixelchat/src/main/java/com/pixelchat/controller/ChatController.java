package com.pixelchat.controller;

import com.pixelchat.model.ChatRoom;
import com.pixelchat.model.Message;
import com.pixelchat.model.User;
import com.pixelchat.service.ChatService;
import com.pixelchat.service.UserService;
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
    private UserService userService;

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

    @GetMapping("/chatrooms/search")
    public List<ChatRoom> searchChatrooms(@RequestParam String query) {
        return chatService.searchByKeyword(query);
    }

    @PostMapping("/create")
    public ResponseEntity<ChatRoom> createChatroom(@RequestBody Map<String, String> payload) {
        String chatroomName = payload.get("name");
        ChatRoom chatroom = chatService.createChatroom(chatroomName);
        if (chatroom == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return ResponseEntity.ok(chatroom);
    }

    @PostMapping("/{chatroomId}/setModerator")
    public ResponseEntity<String> setModerator(@PathVariable Long chatroomId, @RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        boolean success = chatService.setModerator(chatroomId, userId);
        if (!success) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to set moderator");
        }
        return ResponseEntity.ok("Moderator set successfully");
    }

    @DeleteMapping("/{chatroomId}")
    public ResponseEntity<String> deleteChatroom(@PathVariable Long chatroomId) {
        boolean success = chatService.deleteChatroom(chatroomId);
        if (!success) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete chatroom");
        }
        return ResponseEntity.ok("Chatroom deleted successfully");
    }

}


