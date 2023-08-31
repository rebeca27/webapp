package com.pixelchat.controller;


import com.pixelchat.dto.FriendRequestDTO;
import com.pixelchat.model.FriendRequest;
import com.pixelchat.model.User;
import com.pixelchat.repository.UserRepository;
import com.pixelchat.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/friendRequests")
public class FriendRequestController {

    @Autowired
    private FriendRequestService friendRequestService;

    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository to fetch users by email

    @PostMapping("/send")
    public ResponseEntity<?> sendFriendRequest(@RequestBody FriendRequest friendRequestDTO) {
        User sender = friendRequestDTO.getSender();
        User receiver = friendRequestDTO.getReceiver();

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body("Invalid sender or receiver null.");
        }

        if (!userRepository.existsByEmail(sender.getEmail()) || !userRepository.existsByEmail(receiver.getEmail())) {
            return ResponseEntity.badRequest().body("Invalid sender or receiver email.");
        }

        friendRequestService.sendFriendRequest(sender.getEmail(), receiver.getEmail());
        return ResponseEntity.ok("Friend request sent successfully.");
    }


    @PostMapping("/accept/{requestId}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable Long requestId) {
        friendRequestService.acceptFriendRequest(requestId);
        return ResponseEntity.ok("Friend request accepted.");
    }

    @PostMapping("/reject/{requestId}")
    public ResponseEntity<?> rejectFriendRequest(@PathVariable Long requestId) {
        friendRequestService.rejectFriendRequest(requestId);
        return ResponseEntity.ok("Friend request rejected.");
    }

    @GetMapping("/incoming")
    public ResponseEntity<List<FriendRequestDTO>> getIncomingFriendRequests(@RequestHeader("User-Email") String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<FriendRequestDTO> dtos = user.getReceivedRequests().stream()
                .filter(request -> request.getStatus() == FriendRequest.Status.PENDING)
                .map(request -> {
                    FriendRequestDTO dto = new FriendRequestDTO();
                    dto.setId(request.getId());
                    dto.setSenderEmail(request.getSender().getEmail());
                    dto.setReceiverEmail(request.getReceiver().getEmail());
                    dto.setStatus(request.getStatus());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }



}
