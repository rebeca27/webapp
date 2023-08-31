package com.pixelchat.service;

import com.pixelchat.model.FriendRequest;
import com.pixelchat.model.User;
import com.pixelchat.repository.FriendRequestRepository;
import com.pixelchat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public void sendFriendRequest(String senderEmail, String receiverEmail) {
        User sender = userRepository.findByEmail(senderEmail).orElse(null);
        User receiver = userRepository.findByEmail(receiverEmail).orElse(null);

        if (sender == null || receiver == null) {
            throw new IllegalArgumentException("Invalid sender or receiver email.");
        }

        FriendRequest request = new FriendRequest();
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(FriendRequest.Status.PENDING);

        friendRequestRepository.save(request);
    }




    public List<FriendRequest> getIncomingRequests(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return friendRequestRepository.findByReceiverAndStatus(user, FriendRequest.Status.PENDING);
    }

    public void acceptFriendRequest(Long requestId) {
        FriendRequest request = friendRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(FriendRequest.Status.ACCEPTED);
        friendRequestRepository.save(request);
    }

    public void rejectFriendRequest(Long requestId) {
        FriendRequest request = friendRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(FriendRequest.Status.REJECTED);
        friendRequestRepository.save(request);
    }}
