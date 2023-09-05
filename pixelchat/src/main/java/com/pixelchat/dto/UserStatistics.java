package com.pixelchat.dto;

public class UserStatistics {
    private long sentMessages;
    private long receivedMessages;
    private String peakTrafficTime;
    private long activeChats;

    public long getSentMessages() {
        return sentMessages;
    }

    public void setSentMessages(long sentMessages) {
        this.sentMessages = sentMessages;
    }

    public long getReceivedMessages() {
        return receivedMessages;
    }

    public void setReceivedMessages(long receivedMessages) {
        this.receivedMessages = receivedMessages;
    }

    public String getPeakTrafficTime() {
        return peakTrafficTime;
    }

    public void setPeakTrafficTime(String peakTrafficTime) {
        this.peakTrafficTime = peakTrafficTime;
    }

    public long getActiveChats() {
        return activeChats;
    }

    public void setActiveChats(long activeChats) {
        this.activeChats = activeChats;
    }

    private long pendingFriendRequests;

    public long getPendingFriendRequests() {
        return pendingFriendRequests;
    }

    public void setPendingFriendRequests(long pendingFriendRequests) {
        this.pendingFriendRequests = pendingFriendRequests;
    }
}
