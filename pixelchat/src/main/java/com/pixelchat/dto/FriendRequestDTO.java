package com.pixelchat.dto;

import com.pixelchat.model.FriendRequest;

public class FriendRequestDTO {
    private Long id;
    private String senderEmail;
    private String receiverEmail;
    private FriendRequest.Status status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }

    public FriendRequest.Status getStatus() {
        return status;
    }

    public void setStatus(FriendRequest.Status status) {
        this.status = status;
    }

    // getters and setters
}
