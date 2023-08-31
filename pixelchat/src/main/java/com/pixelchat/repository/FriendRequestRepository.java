package com.pixelchat.repository;

import com.pixelchat.model.FriendRequest;
import com.pixelchat.model.User;
import com.pixelchat.model.FriendRequest.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    List<FriendRequest> findByReceiverAndStatus(User receiver, FriendRequest.Status status);
}
